package net.guides.springboot2.springboot2webappjsp.controllers;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.model_objects.special.SearchResult;
import com.wrapper.spotify.model_objects.specification.*;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import com.wrapper.spotify.requests.data.albums.GetAlbumsTracksRequest;
import com.wrapper.spotify.requests.data.browse.GetRecommendationsRequest;
import com.wrapper.spotify.requests.data.personalization.simplified.GetUsersTopArtistsRequest;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistsItemsRequest;
import com.wrapper.spotify.requests.data.search.SearchItemRequest;
import com.wrapper.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;
import org.apache.hc.core5.http.ParseException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;

@RestController
@RequestMapping("/spotify")
public class SpotifyController {
    private static final String clientId = "c529f4c15677428ba80cc9934e5f23ff";
    private static final String clientSecret = "0edc03c357c74df6bf63bfbfff9a5c5e";
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8080/spotify/callback/");
    private static String code = "";
    private static String accessToken ="";

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .setRedirectUri(redirectUri)
            .build();

    private static final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
            .scope("user-modify-playback-state, user-read-playback-state, user-read-private, user-read-currently-playing, user-library-read, user-read-email, streaming, user-library-modify")
            .build();
    private User user;

    // Authorization Code Flow works in 3 steps:
    // 1. Authorization code flow requires a code, which is part of the redirectUri's query parameters when the user has opened a custom URL in a browser.
    @GetMapping("/login")
    public String retrieveCode() {
        final URI uri = authorizationCodeUriRequest.execute();
        System.out.println("URI: " + uri.toString());

        // Get an Authorization URI
        return (uri.toString());
    }


    // 2. When the code has been retrieved, it can send another request to get access token.
    // From above, we get a URI with a code at the end. We need to extract this code
    @GetMapping("/callback")
    public String getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response) throws IOException {
        code = userCode;

        final AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();

        try {
            AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();

            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

        } catch (ParseException e) {
            e.printStackTrace();
        } catch (SpotifyWebApiException e) {
            e.printStackTrace();
        }

        accessToken = spotifyApi.getAccessToken();
        response.sendRedirect("http://localhost:3000/settings?token="+accessToken);

        System.out.println("callback " + accessToken);
        return accessToken;
    }

    @GetMapping("/get-token")
    public String getToken() {
        //return spotifyApi.getAccessToken();
        System.out.println("get-token "+ accessToken);
        return(accessToken);
    }


    // Pass in as http://localhost:8080/spotify/search?item=dojacat
    @GetMapping("/search")
    public SearchResult search(@RequestParam("searchTerm") String searchTerm, @RequestParam("searchType") String searchType, @RequestParam("spotifyToken") String spotifyToken) {

        String item = searchTerm;
        String type = searchType;
        String accessToken = spotifyToken;

        final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

        final SearchItemRequest searchItemRequest = spotifyApi.searchItem(item, type).build();


        try {
            SearchResult searchResult = searchItemRequest.execute();
            System.out.println("Total tracks: " + searchResult.getTracks().getTotal());
            return searchResult;
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }

    }

    @GetMapping("/recommendations")
    public Recommendations getRecommendations() {
        String accessToken = "BQCT4RJY2cVdPPhTivAFSdl5yZj3_rqK-kMRHUPK9q51z1_Gmnt1x9O5j93pjStFDKAVrva9_YXZ8-a8qxDYl4P4ZG4E2Z8uaufUqJsTYLZkoCgf6pL6xYB0EIYGV3G_7fACKHFzERSOmV1blQ";

        final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

        final GetRecommendationsRequest getRecommendationsRequest = spotifyApi.getRecommendations().build();

        Recommendations recommendations = null;
        try {
            recommendations = getRecommendationsRequest.execute();

            System.out.println("Length: " + recommendations.getTracks().length);
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return recommendations;
    }

    @GetMapping("/top-artists")
    public Paging<Artist> getUserTopArtists() {
        String accessToken = "BQDulSO-NwozchKAsb3-bqe6iqQioQnuVLxTuoD3N-qPEBzg2xC3WyVLqnshkkqHHaYUEEdI1peDfpZ8G3CTOcXEwGrmF31pfzMULMlJmu-VEnLFG8WFJB0jYEW5NlTcaOWBvpLQAJAjCOdzOw";

        //final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

        final GetUsersTopArtistsRequest getUsersTopArtistsRequest = spotifyApi.getUsersTopArtists().build();

        Paging<Artist> artistPaging = null;
        try {
            artistPaging = getUsersTopArtistsRequest.execute();

            System.out.println("Total: " + artistPaging.getTotal());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return artistPaging;

    }

    @GetMapping("/get-album-tracks")
    public Paging<TrackSimplified> getAlbumTracks(String albumId) {
        final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

        final GetAlbumsTracksRequest getAlbumsTracksRequest = spotifyApi.getAlbumsTracks(albumId).build();

        Paging<TrackSimplified> trackSimplifiedPaging = null;

        try {
            trackSimplifiedPaging = getAlbumsTracksRequest.execute();

            System.out.println("Total: " + trackSimplifiedPaging.getTotal());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }


        return trackSimplifiedPaging;

    }

    @GetMapping("/get-playlist-tracks")
    public Paging<PlaylistTrack> getPlaylistTracks(@RequestParam("spotifyToken") String spotifyToken, @RequestParam("playlistID") String playlistID) {
        String accessToken = spotifyToken;
        String playlistId = playlistID;
        final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

        final GetPlaylistsItemsRequest getPlaylistsItemsRequest = spotifyApi.getPlaylistsItems(playlistId).build();

        Paging<PlaylistTrack> playlistTrackPaging = null;

        try {
            playlistTrackPaging = getPlaylistsItemsRequest.execute();

            System.out.println("Total: " + playlistTrackPaging.getTotal());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return playlistTrackPaging;
    }


    @GetMapping("/get-current-user-image")
    public Object getCurrentUser(@RequestParam("spotifyToken") String spotifyToken) {
        String accessToken = spotifyToken;

        System.out.println(accessToken);

        final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

        final GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi.getCurrentUsersProfile()
                .build();


        try {
            User user = getCurrentUsersProfileRequest.execute();

            System.out.println("Display name: " + user.getDisplayName());
            System.out.println("Display name: " + user.getImages()[0].getUrl());



            ArrayList<String> returnList = new ArrayList<String>();
            returnList.add(user.getDisplayName());

            String image = user.getImages()[0].getUrl();
            returnList.add(image);

            return returnList;



        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        //return new String[]{user.getDisplayName(), Arrays.toString(user.getImages())};
        return null;


    }

}

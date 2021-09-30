package net.guides.springboot2.springboot2webappjsp.controllers;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.model_objects.special.SearchResult;
import com.wrapper.spotify.model_objects.specification.Artist;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.Recommendations;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import com.wrapper.spotify.requests.data.browse.GetRecommendationsRequest;
import com.wrapper.spotify.requests.data.personalization.simplified.GetUsersTopArtistsRequest;
import com.wrapper.spotify.requests.data.search.SearchItemRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchArtistsRequest;
import org.apache.hc.core5.http.ParseException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/spotify")
public class SpotifyController {
    private static final String clientId = "c529f4c15677428ba80cc9934e5f23ff";
    private static final String clientSecret = "0edc03c357c74df6bf63bfbfff9a5c5e";
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8080/spotify/callback/");
    private static String code = "";

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .setRedirectUri(redirectUri)
            .build();

    private static final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri().build();

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

        //response.sendRedirect("http://localhost:3000/search-results");
        return spotifyApi.getAccessToken();

    }

    /*@GetMapping("/search")
    public SearchResult search(String item) {
        String type = "album,artist,playlist,track,show,episode";

        String accessToken="BQCT4RJY2cVdPPhTivAFSdl5yZj3_rqK-kMRHUPK9q51z1_Gmnt1x9O5j93pjStFDKAVrva9_YXZ8-a8qxDYl4P4ZG4E2Z8uaufUqJsTYLZkoCgf6pL6xYB0EIYGV3G_7fACKHFzERSOmV1blQ";

        System.out.println(type);

        final SearchItemRequest searchItemRequest = spotifyApi.searchItem(item, type).build();

        SearchResult searchResult = null;

        try {
            searchResult = searchItemRequest.execute();

            System.out.println("Total tracks: " + searchResult.getTracks().getTotal());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return searchResult;

    }*/

    // Pass in as http://localhost:8080/spotify/search?item=dojacat
    @GetMapping("/search")
    public SearchResult search(String item) {
        String type = "album,artist,playlist,track";

        String accessToken = "BQCbtQHUb25hghrGQETmoD5w7NtUWKeEBjY4u9zvGNm-QMDAuJxDj-XFp41K45EKLrPoxhkX4SY-7qpDL7aDqb5mrmdrp203VK04c4lyw9_cpkyRYQ5Q1cf2jZCOpmQxvSk8vivrh1r6pW_-Qg";

        final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

        final SearchItemRequest searchItemRequest = spotifyApi.searchItem(item, type).build();

        SearchResult searchResult = null;

        try {
            searchResult = searchItemRequest.execute();

            System.out.println("Total tracks: " + searchResult.getTracks().getTotal());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return searchResult;

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

        final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();

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

}

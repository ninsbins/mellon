package net.guides.springboot2.springboot2webappjsp.controllers;

//import org.json.JSONArray;
//import org.json.JSONObject;
//import org.json.JSONParser;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

@RestController
@RequestMapping("/catalog") //when somebody calls this url, load up this class.
public class MediaAPIController {

    @RequestMapping("/{userId}") //variable userId AFTER catalog
    public String getCatalog(@PathVariable("userId") String userId) {
        //NOTE: function return type was, List<MediaItem>
        System.out.println("Calling movie/film api: " + userId);

        StringBuilder builder = new StringBuilder();


        //hardcoded Mr Robot before, now depending on /catalog/THIS!
        String s4 = "http://www.omdbapi.com/?s=" + userId + "&r=json&apikey=78f2db02"; //Search up Mr Robot and get in json type

        try {

            URL url = new URL(s4);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.connect();

            //Getting the response code
            int responseCode = conn.getResponseCode();

            if (responseCode != 200) {
                throw new RuntimeException("HttpResponseCode: " + responseCode);
            } else {

                String inline = "";
                Scanner scanner = new Scanner(url.openStream());

                //Write all the JSON data into a string using a scanner
                while (scanner.hasNext()) {
                    inline += scanner.nextLine();
                }

                //Close the scanner
                scanner.close();

                System.out.println(inline);
                System.out.println("~~~~~~~~~~~~~~~~~~~~");

                //Using the JSON Simple library parse the string into a json object
//                JSONParser parse = new JSONParser();
//                JSONObject data_obj = (JSONObject) parse.parse(inline);
//
//                //Get the required object from the above created object
//                //JSONObject obj = (JSONObject) data_obj.get("Search");
//
//
//                JSONArray arr = (JSONArray) data_obj.get("Search"); //JSON array having 7 objects(results).
//                System.out.println("Number of Search Results: " + arr.size()); //7 objects
//                System.out.println("~~~~~~~~~~~~~~~~~~~~");
//
//                //For Printing to the web app:
//
//                for (int i = 0; i < arr.size(); i++) {
//
//                    JSONObject new_obj = (JSONObject) arr.get(i); //each of the 7 objects
//                    //System.out.println("Title " + i + " : " + new_obj.get("Title"));
//
//                    builder.append("Title " + i + " : " + new_obj.get("Title") + ". " +
//                            "Year(s): " + new_obj.get("Year") + " ."); //NEWLINE??
//                    builder.append(System.lineSeparator());
//
//                }
//
//                System.out.println(builder); //testing

            }

        }catch(Exception e) {
            e.printStackTrace();
        }

        //return Collections.singletonList(new MediaItem("LOTR", "2000s", "Movie Trilogy"));
        return builder.toString();
    }


}

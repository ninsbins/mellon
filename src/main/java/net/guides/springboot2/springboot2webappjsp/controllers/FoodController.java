package net.guides.springboot2.springboot2webappjsp.controllers;


import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.Objects;

public class FoodController {

    @RequestMapping(value = "/getFood" ,method = RequestMethod.GET)
    @ResponseBody
    public String food(String recipe) throws IOException {

        System.out.println("Recipe is : " + recipe);

        String callUrl = "https://themealdb.com/api/json/v1/1/search.php?s="+recipe;

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url(callUrl)
                .method("GET", null)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(Objects.requireNonNull(response.body()).string());

        return Objects.requireNonNull(response.body()).string();

    }


    @RequestMapping(value = "/foodIndex" ,method = RequestMethod.GET)
    @ResponseBody
    public String foodIndex(String recipe) throws IOException {

        System.out.println("Recipe is : " + recipe);

        String callUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+recipe;


        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url(callUrl)
                .method("GET", null)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(Objects.requireNonNull(response.body()).string());


        return Objects.requireNonNull(response.body()).string();


    }
}

package net.guides.springboot2.springboot2webappjsp.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class HomePageController {
    // Read data from application.properties
//    @Value("${content}")
//    private String content;
//
//    // Update data attributes of JSP using map.put
//    @GetMapping("/")
//    public String index( Map<String, Object> map ) {
//        map.put("content", content);
//        return "index";
//    }
    @RequestMapping(value="/")
    public String index() {
        return "index";
    }
}

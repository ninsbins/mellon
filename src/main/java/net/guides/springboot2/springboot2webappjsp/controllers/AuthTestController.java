package net.guides.springboot2.springboot2webappjsp.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/test")
public class AuthTestController {

    @GetMapping("/all")
    public String allAccess() {
        return "Test succeeded.";
    }

    @GetMapping("/spotifylogin")
    public String returnSpotify() {return "Spotify Success";}
}

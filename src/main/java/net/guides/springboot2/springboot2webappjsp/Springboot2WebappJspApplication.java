package net.guides.springboot2.springboot2webappjsp;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class Springboot2WebappJspApplication {


	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/spotify/search").allowedOrigins("http://localhost:3000/search");
				registry.addMapping("/api/auth/signup").allowedOrigins("http://localhost:3000/signup");
				registry.addMapping("/api/auth").allowedOrigins("http://localhost:3000/signup");
				registry.addMapping("/api/auth/login").allowedOrigins("http://localhost:3000/login");
				registry.addMapping("/spotify/login").allowedOrigins("*");
				registry.addMapping("/spotify/callback").allowedOrigins("*");
				registry.addMapping("/spotify/get-token").allowedOrigins("http://localhost:3000/profile");

			}
		};
	}
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(Springboot2WebappJspApplication.class);
		//app.setDefaultProperties(Collections.singletonMap("server.servlet.context-path", "/springboot2webapp"));
		app.run(args);
	}



}
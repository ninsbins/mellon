package net.guides.springboot2.springboot2webappjsp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
				registry.addMapping("/post/posts").allowedOrigins("http://localhost:3000/");
				registry.addMapping("/spotify/login").allowedOrigins("*");
				registry.addMapping("/spotify/callback").allowedOrigins("*");
				registry.addMapping("/spotify/get-token").allowedOrigins("http://localhost:3000/profile");
				registry.addMapping("/update/user").allowedOrigins("http://localhost:3000/profile");
				registry.addMapping("/api/auth/user").allowedOrigins("http://localhost:3000/profile");
				registry.addMapping("/follow/followeruser").allowedOrigins("*");
				registry.addMapping("/follow/getfollowedby").allowedOrigins("*");
				registry.addMapping("/follow/getfollowing").allowedOrigins("*");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(Springboot2WebappJspApplication.class);
		//app.setDefaultProperties(Collections.singletonMap("server.servlet.context-path", "/springboot2webapp"));
		app.run(args);
	}



}
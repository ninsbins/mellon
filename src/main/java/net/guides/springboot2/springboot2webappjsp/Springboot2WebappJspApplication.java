package net.guides.springboot2.springboot2webappjsp;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Springboot2WebappJspApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(Springboot2WebappJspApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.servlet.context-path", "/springboot2webapp"));
		app.run(args);

	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**");
				registry.addMapping("/users").allowedOrigins("http://localhost:3000");
			}
		};
	}

}
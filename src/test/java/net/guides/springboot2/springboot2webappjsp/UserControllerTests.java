package net.guides.springboot2.springboot2webappjsp;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.guides.springboot2.springboot2webappjsp.controllers.UserControllerTesting;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc(secure = false) //secure=false, solved the 401 issue
@RunWith(SpringRunner.class) //solved issue with NullPointerException
@WebMvcTest(UserControllerTesting.class)
public class UserControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    UserRepository repo; //mocked

    @MockBean
    PasswordEncoder encoder;

    User user1 = new User("HarveySpecter", "theBestCloser@gmail.com", "hs123456");
    User user2 = new User("DonnaPaulsen", "donnapaulsen@gmail.com", "dp123456");
    User user3 = new User("LouisLitt", "norma@gmail.com", "catGuy123456");

    @Test
    public void getAllUsers() throws Exception {
        List<User> records = new ArrayList<>(Arrays.asList(user1, user2, user3));

        Mockito.when(repo.findAll()).thenReturn(records);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/update/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").value("theBestCloser@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2].email").value("norma@gmail.com"));

    }


    @Test
    public void getUsersById() throws Exception {

        user1.setId(100);
        user2.setId(101);
        user3.setId(102);

        //because User Repo is mocked, define behaviour of method to be called
        Mockito.when(repo.findById(100)).thenReturn(java.util.Optional.ofNullable(user1));
        Mockito.when(repo.findById(101)).thenReturn(java.util.Optional.ofNullable(user2));
        Mockito.when(repo.findById(102)).thenReturn(java.util.Optional.ofNullable(user3));

        assertEquals(repo.findById(100).get().getUsername(), "HarveySpecter");
        assertEquals(repo.findById(101).get().getUsername(), "DonnaPaulsen");
        verify(repo, times(2)).findById(anyInt()); //check email method called 6 times

        //Get Harvey info
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/update/users/100")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue())) //checking result is not Null
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("theBestCloser@gmail.com"));


        //Get Donna info
        user2.setBio("I'm Donna. I know everything.");

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/update/users/101")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue())) //checking result is not Null
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("donnapaulsen@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.bio").value("I'm Donna. I know everything."));


        //Get Louis info
        user3.setBio("You just got Litt up!");

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/update/users/102")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue())) //checking result is not Null
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("norma@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.bio").value("You just got Litt up!"));


        verify(repo, times(5)).findById(anyInt()); //check method called 5 times

    }

    @Test
    public void updateUserDetailsSuccess() throws Exception {

        //Harvey - bio updating
        user1.setId(100);
        user1.setBio("Mike is better than me :) ");

        User user1_updated = new User("HarveySpecter", "theBestCloser88@gmail.com", "hs123456");
        user1_updated.setFirstName("Harvey");
        user1_updated.setLastName("Specter");
        user1_updated.setBio("no he is not.");

        Mockito.when(repo.findById(user1.getId())).thenReturn(java.util.Optional.ofNullable(user1)); //return Harvey
        Mockito.when(repo.save(any())).thenReturn(user1_updated);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/update/users/100")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(user1_updated)); //put updatedUser into request body

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("theBestCloser88@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Harvey"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Specter"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.bio").value("no he is not."));

        verify(repo, times(1)).findById(100); //check method called
        verify(repo, times(1)).save(any()); //check method called

    }

}

package net.guides.springboot2.springboot2webappjsp;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.guides.springboot2.springboot2webappjsp.controllers.UserControllerTesting;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.*;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc(secure = false) //secure=false, solved the 401 issue
@RunWith(SpringRunner.class) //solved issue with NullPointerException
@WebMvcTest(UserControllerTesting.class)
public class AuthTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    private UserRepository repository; //No mocking here

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
    public void loginError() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        user1.setPassword("123456");
        Map<String, String> values = new HashMap<>();
        values.put("username", "username");
        values.put("password", "password");
        List<User> records = new ArrayList<>(Arrays.asList(user1, user2, user3));

        Mockito.when(repo.findAll()).thenReturn(records);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/login")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());

    }
    @Test
    public void testExistByUsername() {

        User user1 = new User("admin1", "admin1@gmail.com", "firstname1", "lastname1", "my bio1");
        User user2 = new User("admin2", "admin2@gmail.com", "firstname2", "lastname2", "my bio2");

        when(repository.existsByUsername("admin1")).thenReturn(true);
        when(repository.existsByUsername("admin2")).thenReturn(true);

        assertFalse(repository.existsByUsername("admin111"));
        assertFalse(repository.existsByUsername("admin222"));

        assertTrue(repository.existsByUsername("admin1"));
        assertTrue(repository.existsByUsername("admin2"));




    }
}

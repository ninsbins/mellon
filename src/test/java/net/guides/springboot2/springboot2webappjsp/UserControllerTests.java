package net.guides.springboot2.springboot2webappjsp;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.guides.springboot2.springboot2webappjsp.controllers.UserControllerTesting;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
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

}

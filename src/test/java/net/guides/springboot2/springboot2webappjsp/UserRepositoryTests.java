package net.guides.springboot2.springboot2webappjsp;

import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.Optional;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc //added this
public class UserRepositoryTests {

    @Autowired
    private UserRepository repository; //No mocking here


    @Test
    public void findByEmailTest() {

        User user1 = new User("jess123456", "jess123456@gmail.com", "password123456");
        repository.save(user1);

        User user1_copy = repository.findByEmail("jess123456@gmail.com"); //using this email method, add this method back in, deleted lol
        assertEquals(user1_copy.getUsername(), "jess123456");

        repository.delete(user1); //delete the record in db because of unique constraints
        assertNull(repository.findByEmail("jess123456@gmail.com")); //user no longer exists
    }



    @Test
    public void findByUsernameTest() {

        User user1 = new User("Frodo", "frodo123@gmail.com", "frodo123");
        User user2 = new User("Sam", "sam123@gmail.com", "sam123");
        repository.save(user1); //saving to DB
        repository.save(user2);

        Optional<User> user1_copy = repository.findByUsername("Frodo"); //using this username method
        assertEquals(user1_copy.get().getEmail(), "frodo123@gmail.com");

        Optional<User> user2_copy = repository.findByUsername("Sam"); //using this username method
        assertEquals(user2_copy.get().getEmail(), "sam123@gmail.com");

        repository.delete(user1); //delete
        repository.delete(user2);
    }

    @Test
    public void existByUsernameTest() {

        User user1 = new User("Frodo", "frodo123@gmail.com", "frodo123");
        User user2 = new User("Sam", "sam123@gmail.com", "sam123");
        repository.save(user1);
        repository.save(user2);

        Boolean value1 = repository.existsByUsername("Frodo");
        assertTrue(value1);

        Boolean value2 = repository.existsByUsername("Sam");
        assertTrue(value2);

        Boolean value3 = repository.existsByUsername("Frodo1"); //doesn't exist
        assertFalse(value3);

        repository.delete(user1); //delete
        repository.delete(user2);
    }

    @Test
    public void existByEmailTest() {

        User user1 = new User("Frodo", "frodo123@gmail.com", "frodo123");
        User user2 = new User("Sam", "sam123@gmail.com", "sam123");
        repository.save(user1);
        repository.save(user2);

        Boolean value1 = repository.existsByEmail("frodo123@gmail.com");
        assertTrue(value1);

        Boolean value2 = repository.existsByEmail("sam123@gmail.com");
        assertTrue(value2);

        Boolean value3 = repository.existsByEmail("frodo1234@gmail.com"); //doesn't exist
        assertFalse(value3);

        repository.delete(user1); //delete
        repository.delete(user2);
    }


}
package net.guides.springboot2.springboot2webappjsp;

import net.guides.springboot2.springboot2webappjsp.controllers.UserControllerTesting;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

//Mocking
public class UserRepositoryMockTests {

    //uses Mockito
    @InjectMocks
    private UserControllerTesting userController;

    @Mock
    private UserRepository userRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindByUsername() {

        User user1 = new User("admin1", "admin@gmail.com", "firstname1" , "lastname1", "my bio");
        User user2 = new User("admin2", "admin2@gmail.com", "firstname2" , "lastname2", "my bio2");

        when(userRepository.findByUsername("admin1")).thenReturn(java.util.Optional.of(user1));
        when(userRepository.findByUsername("admin2")).thenReturn(java.util.Optional.of(user2));

        assertNotNull(userRepository.findByUsername("admin1"));
        assertNotNull(userRepository.findByUsername("admin2"));

        Optional<User> user3 = userRepository.findByUsername("admin1"); //get user 1
        Optional<User> user4 = userRepository.findByUsername("admin2"); //get user 2

        assertEquals(user3.get().getFirstName(), "firstname1");
        assertEquals(user3.get().getEmail(), "admin@gmail.com");

        assertEquals(user4.get().getLastName(), "lastname2");
        assertEquals(user4.get().getEmail(), "admin2@gmail.com");

        verify(userRepository, times(4)).findByUsername(anyString()); //check method has been called 4 times
    }



    @Test
    public void testFindByEmail() {

        User user1 = new User("admin1", "admin1@gmail.com", "firstname1" , "lastname1", "my bio1");
        User user2 = new User("admin2", "admin2@gmail.com", "firstname2" , "lastname2", "my bio2");

        when(userRepository.findByEmail("admin1@gmail.com")).thenReturn(user1); //add this method back, got deleted somehow
        when(userRepository.findByEmail("admin2@gmail.com")).thenReturn(user2);

        assertNull(userRepository.findByEmail("admin1@gmail")); //doesn't exist
        assertNull(userRepository.findByEmail("admin2@gmail")); //doesn't exist
        assertNotNull(userRepository.findByEmail("admin1@gmail.com"));
        assertNotNull(userRepository.findByEmail("admin2@gmail.com"));

        User user3 = userRepository.findByEmail("admin1@gmail.com"); //get user 1
        User user4 = userRepository.findByEmail("admin2@gmail.com"); //get user 2

        assertEquals(user3.getFirstName(), "firstname1");
        assertEquals(user3.getBio(), "my bio1");

        assertEquals(user4.getLastName(), "lastname2");
        assertEquals(user4.getEmail(), "admin2@gmail.com");

        verify(userRepository, times(6)).findByEmail(anyString()); //check email method called 6 times
    }


    @Test
    public void testExistByUsername() {

        User user1 = new User("admin1", "admin1@gmail.com", "firstname1" , "lastname1", "my bio1");
        User user2 = new User("admin2", "admin2@gmail.com", "firstname2" , "lastname2", "my bio2");

        when(userRepository.existsByUsername("admin1")).thenReturn(true);
        when(userRepository.existsByUsername("admin2")).thenReturn(true);

        assertFalse(userRepository.existsByUsername("admin111")); //doesn't exist
        assertFalse(userRepository.existsByUsername("admin222")); //doesn't exist

        assertTrue(userRepository.existsByUsername("admin1")); //does exist
        assertTrue(userRepository.existsByUsername("admin2")); //does exist

        verify(userRepository, times(4)).existsByUsername(anyString()); //check email method called 6 times
    }

    @Test
    public void testExistByEmail() {

        User user1 = new User("admin1", "admin1@gmail.com", "firstname1" , "lastname1", "my bio1");
        User user2 = new User("admin2", "admin2@gmail.com", "firstname2" , "lastname2", "my bio2");

        when(userRepository.existsByEmail("admin1@gmail.com")).thenReturn(true);
        when(userRepository.existsByEmail("admin2@gmail.com")).thenReturn(true);

        assertFalse(userRepository.existsByEmail("admin11@gmail.com")); //doesn't exist
        assertFalse(userRepository.existsByEmail("admin22@gmail.com")); //doesn't exist

        assertTrue(userRepository.existsByEmail("admin1@gmail.com")); //does exist
        assertTrue(userRepository.existsByEmail("admin2@gmail.com")); //does exist

        verify(userRepository, times(4)).existsByEmail(anyString()); //check email method called 6 times

        //check size of Users in repo.
        List<User> users = Arrays.asList(user1, user2);
        when(userRepository.findAll()).thenReturn(users);
        assertEquals(userRepository.findAll().size(), 2);
    }

}

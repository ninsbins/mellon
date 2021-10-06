package net.guides.springboot2.springboot2webappjsp.domain;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "user")
public class User
{
	@Id 
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(nullable=false, unique=true, length=45)
	private String email;

	@Column(nullable=false, unique=true, length=45)
	private String username;

	@Column(nullable=false, length=64)
	private String password;

//	@Column(name="first_name", nullable=false, length=20)
//	private String firstName;
//
//	@Column(name="last_name", nullable=false, length=20)
//	private String lastName;


	public User(String username, String email, String password)
	{
		this.username=username;
		this.email = email;
		this.password=password;
	}

	public User() {}


    public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

//	public String getFirstName()
//	{
//		return firstName;
//	}
//
//	public void setFirstName(String name)
//	{
//		this.firstName = firstName;
//	}
//
//	public void setLastName(String name)
//	{
//		this.lastName = lastName;
//	}
//
//	public String getLastName()
//	{
//		return this.lastName;
//	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	public String getEmail()
	{
		return this.email;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public String getPassword()
	{
		return this.password;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public String getUsername()
	{
		return this.username;
	}
	
}

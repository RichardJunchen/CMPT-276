/*
 * Copyright 2002-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Map;

@Controller
@SpringBootApplication
public class Main {

  @Value("${spring.datasource.url}")
  private String dbUrl;

  @Autowired
  private DataSource dataSource;

  public static void main(String[] args) throws Exception {
    SpringApplication.run(Main.class, args);
  }

  @RequestMapping("/")
  String index(Map<String,Object> model) {
  
    return "index";
  }

@GetMapping(
  path = "/rectangle"
)
public String getRectangleForm(Map<String,Object> model){
  Rectangle rectangle = new Rectangle();
  model.put("rectangle",rectangle);
  return "rectangle";
}

@GetMapping(
    path = "/introduction"
  )
  public String getIntroduction(Map<String,Object> model){
    return "intro";
  }

  
@PostMapping(
  path = "/rectangle",
  consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE}

)
public String handleBrowserrectangleSubmit(Map<String, Object> model,Rectangle rectangle) throws Exception{

  try (Connection connection = dataSource.getConnection()) {
    Statement stmt = connection.createStatement();
    stmt.executeUpdate("CREATE TABLE IF NOT EXISTS rectangle (id serial, name varchar(20), width float8, height float8, color varchar(10), price float8 )");
    String sql = "INSERT INTO rectangle (name,width,height,color,price) VALUES ('" + rectangle.getName() + "','" + rectangle.getWidth() + "','" + rectangle.getHeight() +"','" + rectangle.getColor() +"','" + rectangle.getPrice()+ "')";
    stmt.executeUpdate(sql);
    return "redirect:/rectangle/success";
  } catch (Exception e) {
    model.put("message", e.getMessage());
    return "error";
  }


}
@GetMapping("/rectangle/success")
  public String getPersonSuccess(){
    return "success";
  }


@GetMapping(path = "/delete_rectangle")

public String getTheDeleteList(Map<String,Object> model){
  try(Connection connection = dataSource.getConnection()){
    Statement stmt = connection.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM rectangle");
    
    ArrayList<Rectangle> output = new ArrayList<Rectangle>();
    while(rs.next()){
      Rectangle temp = new Rectangle();
      temp.setId(rs.getInt("id"));
      temp.setName(rs.getString("name"));
      temp.setWidth(rs.getDouble("width"));
      temp.setHeight(rs.getDouble("height"));
      temp.setColor(rs.getString("color"));
      temp.setPrice(rs.getDouble("price"));
      output.add(temp);
    }
    model.put("records",output);
    return "delete";
  } catch(Exception e){
    model.put("message", e.getMessage());
    return "error";
  }
}

@GetMapping ("/view/{pid}")
public String view_rectangle(Map<String,Object> model,@PathVariable String pid){
  try(Connection connection = dataSource.getConnection()){
    Statement stat = connection.createStatement();
    String command = "SELECT * FROM rectangle WHERE id=" + pid;
    
    ResultSet rs = stat.executeQuery(command);
    while(rs.next()){
      Rectangle temp = new Rectangle();
      temp.setId(rs.getInt("id"));
      temp.setName(rs.getString("name"));
      temp.setWidth(rs.getDouble("width"));
      temp.setHeight(rs.getDouble("height"));
      temp.setColor(rs.getString("color"));
      temp.setPrice(rs.getDouble("price"));
      model.put("views",temp);
    }
    return "view_rectangle";
  } catch(Exception e){
    model.put("message", e.getMessage());
    return "error";
  }
}

@RequestMapping ("/delete/{pid}")
public String delete_rectangle(Map<String,Object> model,@PathVariable String pid){
  try(Connection connection = dataSource.getConnection()){
    Statement stmt = connection.createStatement();
    stmt.executeUpdate("DELETE FROM rectangle WHERE id=" + pid);
    return "successful2";
  } catch(Exception e){
    model.put("message", e.getMessage());
    return "error";
  }
}


  @RequestMapping("/db")
  String db(Map<String, Object> model) {
    try (Connection connection = dataSource.getConnection()) {
      Statement stmt = connection.createStatement();
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)");
      stmt.executeUpdate("INSERT INTO ticks VALUES (now())");
      ResultSet rs = stmt.executeQuery("SELECT tick FROM ticks");

      ArrayList<String> output = new ArrayList<String>();
      while (rs.next()) {
        output.add("Read from DB: " + rs.getTimestamp("tick"));
      }

      model.put("records", output);
      return "db";
    } catch (Exception e) {
      model.put("message", e.getMessage());
      return "error";
    }
  }

  @Bean
  public DataSource dataSource() throws SQLException {
    if (dbUrl == null || dbUrl.isEmpty()) {
      return new HikariDataSource();
    } else {
      HikariConfig config = new HikariConfig();
      config.setJdbcUrl(dbUrl);
      return new HikariDataSource(config);
    }
  }


@GetMapping(path = "/all_rectangle")

public String getAllList(Map<String,Object> model){
  try(Connection connection = dataSource.getConnection()){
    Statement stmt = connection.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM rectangle");
    ArrayList<Rectangle> all = new ArrayList<Rectangle>();
    while(rs.next()){
      Rectangle temp = new Rectangle();
      temp.setId(rs.getInt("id"));
      temp.setName(rs.getString("name"));
      temp.setWidth(rs.getDouble("width"));
      temp.setHeight(rs.getDouble("height"));
      temp.setColor(rs.getString("color"));
      temp.setPrice(rs.getDouble("price"));
      all.add(temp);
    }
    model.put("all_rectangles",all);
    return "all";
  } catch(Exception e){
    model.put("message", e.getMessage());
    return "error";
  }
}
}


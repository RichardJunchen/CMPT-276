package com.example;
public class Rectangle {
  private Integer id;
  private String name;
  private Double width;
  private Double height;
  private String color;
  private Double price;

  public Integer getId(){
    return this.id;
  }

  public String getName(){
    return this.name;
  }

  public Double getWidth(){
    return this.width;
  }

  public Double getHeight(){
    return this.height;
  }

  public String getColor(){
    return this.color;
  }

  public Double getPrice(){
    return this.price;
  }

  public void setId(Integer new_id){
    this.id = new_id;
  }

  public void setName(String new_name){
    this.name = new_name;
  }

  public void setWidth(Double new_width){
    this.width = new_width;
  }

  public void setHeight(Double new_height){
    this.height = new_height;
  }

  public void setColor(String new_color){
    this.color = new_color;
  }

  public void setPrice(Double new_price){
    this.price = new_price;
  }

}

--USERS
-------
CREATE TABLE users (
    user_id serial NOT NULL,
    username varchar(50) NOT NULL,
    email varchar(320) NOT NULL,
    role varchar(50) NOT NULL,
    CONSTRAINT permissions CHECK (role IN ('staff', 'administrator')),
    PRIMARY KEY (user_id)
);

INSERT INTO users (username, email, role) VALUES ('abiel_kim', 'abielkim@hotmail.com', 'administrator');
INSERT INTO users (username, email, role) VALUES ('tazjmal', 'tazjmal633@gmail.com', 'administrator');
INSERT INTO users (username, email, role) VALUES ('tommychang', 'tommychang97@gmail.com', 'administrator');
INSERT INTO users (username, email, role) VALUES ('wenqing', 'wenqingl@sfu.ca', 'administrator');
INSERT INTO users (username, email, role) VALUES ('junchenl', '2664454673@qq.com', 'administrator');



--LOCATIONS
-----------
CREATE TABLE locations 
(
    location_name varchar(50) NOT NULL,
    PRIMARY KEY (location_name)
);


--PRODUCTS
----------
CREATE TABLE products 
(
    product_id serial NOT NULL,
    product_name varchar(50) NOT NULL,
    product_desc varchar(300) NOT NULL, 
    category varchar(50) NOT NULL,
    value int NOT NULL,
    PRIMARY KEY (product_id)
);

CREATE TABLE product_details
(
    product_id int NOT NULL,
    sku_id int NOT NULL,
    size varchar(50),
    gender varchar(50),
    color varchar(50),
    product_location varchar(50) NOT NULL,
    product_count int NOT NULL,
    product_img varchar(200) NOT NULL,
    PRIMARY KEY (sku_id),
    CONSTRAINT product_id_FK FOREIGN KEY (product_id) REFERENCES products (product_id),
    CONSTRAINT location_FK FOREIGN KEY (product_location) REFERENCES locations (location_name) 
);


--ORDERS
--------
CREATE TABLE orders
(
    order_id serial NOT NULL,
    requester_id int NOT NULL,
    fulfiller_id int,
    status varchar(50) NOT NULL,
    request_type varchar(50),
    date_created date NOT NULL,
    date_completed date,
    PRIMARY KEY (order_id),
    CONSTRAINT requester_id_FK FOREIGN KEY (requester_id) REFERENCES users (user_id),
    CONSTRAINT fulfiller_id_FK FOREIGN KEY (fulfiller_id) REFERENCES users (user_id)
);

CREATE TABLE order_lines
(
    order_id int NOT NULL,
    sku_id int NOT NULL,
    order_count int NOT NULL,
    PRIMARY KEY (order_id, sku_id),
    CONSTRAINT order_id_FK FOREIGN KEY (order_id) REFERENCES orders (order_id),
    CONSTRAINT sku_id_FK FOREIGN KEY (sku_id) REFERENCES product_details (sku_id)
);


--SAMPLE PRODUCTS
-----------------
--Locations
INSERT INTO locations (location_name)
VALUES ('Burnaby'),('Vancouver'),('Richmond'),('Surry'),('Metrotown'),('New Westminster');

--Sample Bottle
INSERT INTO products(product_id,product_name,product_desc,category,value)
VALUES (1,'bottle_a','this is the bottles_a','bottle',1),(2,'bottle_b','this is the bottles_b','bottle',2),(3,'bottle_c','this is the bottles_c','bottle',3),
(4,'bottle_d','this is the bottles_d','bottle',4),(5,'bottle_e','this is the bottles_e','bottle',5),(6,'bottle_f','this is the bottles_f','bottle',6),
(7,'bottle_g','this is the bottles_g','bottle',7),(8,'bottle_h','this is the bottles_h','bottle',8),(9,'bottle_i','this is the bottles_i','bottle',9);

INSERT INTO product_details (product_id, sku_id, size, gender, color, product_location,product_count,product_img)
VALUES (1, 1454758, 'L','Unisex','Blue','Richmond',8,'bottle.jpg'),(1, 1454759, 'S','Unisex','Red','Richmond',8,'bottle.jpg'),
(1, 1454750, 'L','Unisex','Blue','Richmond',8,'bottle.jpg'),(2, 2151244, 'M','Unisex','Blue','Burnaby',4,'bottle.jpg'),
(3, 8408836, 'S','Unisex','Blue','Vancouver',8,'bottle.jpg'),(4, 4842890, 'L','Femele','Red','Surry',8,'bottle.jpg'),
(5, 2605310, 'M','Femele','Red','Metrotown',3,'bottle.jpg'),(6, 4584389, 'S','Femele','Red','Vancouver',3,'bottle.jpg'),
(7, 3332352, 'L','Male','Brown','Vancouver',3,'bottle.jpg'),(8, 4109764, 'M','Male','Brown','Burnaby',7,'bottle.jpg'),
(9, 8312233, 'S','Male','Brown','Vancouver',2,'bottle.jpg');

--Sample Backpack
INSERT INTO products(product_id,product_name,product_desc,category,value)
VALUES (10,'backpack_a','this is the backpack_a','backpack',8),(11,'backpack_b','this is the backpack_b','backpack',8),(12,'backpack_c','this is the backpack_c','backpack',8),
(13,'backpack_d','this is the backpack_d','backpack',8),(14,'backpack_e','this is the backpack_e','backpack',8),(15,'backpack_f','this is the backpack_f','backpack',8),
(16,'backpack_g','this is the backpack_g','backpack',8),(17,'backpack_h','this is the backpack_h','backpack',8),(18,'backpack_i','this is the backpack_i','backpack',8);

INSERT INTO product_details (product_id, sku_id, size, gender, color, product_location,product_count,product_img)
VALUES (10, 2156419, 'L','Unisex','Blue','Surry',4,'backpack.jpg'),(11, 2945257, 'M','Unisex','Blue','Richmond',4,'backpack.jpg'),
(12, 6845645, 'S','Unisex','Blue','Richmond',6,'backpack.jpg'),(13, 7180095, 'L','Unisex','Yellow','Richmond',9,'backpack.jpg'),
(14, 9867550, 'M','Unisex','Yellow','Vancouver',7,'backpack.jpg'),(15, 7715502, 'S','Unisex','Yellow','Surry',5,'backpack.jpg'),
(16, 1385245, 'L','Male','Black','Surry',2,'backpack.jpg'),(17, 2632964, 'M','Male','Black','Burnaby',9,'backpack.jpg'),
(18, 1362805, 'S','Male','Black','Metrotown',8,'backpack.jpg');

--Sample Shirts
INSERT INTO products(product_id,product_name,product_desc,category,value)
VALUES (19,'shirt_a','this is the shirt_a','shirt',8),(20,'shirt_b','this is the shirt_b','shirt',8),(21,'shirt_c','this is the shirt_c','shirt',8),
(22,'shirt_d','this is the shirt_d','shirt',8),(23,'shirt_e','this is the shirt_e','shirt',8),(24,'shirt_f','this is the shirt_f','shirt',8),
(25,'shirt_g','this is the shirt_g','shirt',8),(26,'shirt_h','this is the shirt_h','shirt',8),(27,'shirt_i','this is the shirt_i','shirt',8);

INSERT INTO product_details (product_id, sku_id, size, gender, color, product_location,product_count,product_img)
VALUES (19, 6725214, 'L','Male','Green','New Westminster',4,'shirt.jpg'),(20, 2958512, 'M','Male','Green','Vancouver',8,'shirt.jpg'),
(21, 1119808, 'S','Male','Green','Richmond',9,'shirt.jpg'),(22, 2089404, 'L','Unisex','Blue','Vancouver',4,'shirt.jpg'),
(23, 7455465, 'M','Unisex','Blue','New Westminster',4,'shirt.jpg'),(24, 1190943, 'S','Unisex','Blue','New Westminster',9,'shirt.jpg'),
(25, 3681206, 'L','Male','Black','Surry',8,'shirt.jpg'),(26, 4506044, 'M','Male','Black','Burnaby',6,'shirt.jpg'),
(27, 1150547, 'S','Male','Black','Metrotown',5,'shirt.jpg');


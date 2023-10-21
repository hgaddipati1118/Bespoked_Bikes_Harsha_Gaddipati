DROP DATABASE IF EXISTS bespoked_bikes;
CREATE DATABASE IF NOT EXISTS bespoked_bikes;
USE bespoked_bikes;

DROP TABLE IF EXISTS product;
CREATE TABLE product (
  product_id bigint NOT NULL AUTO_INCREMENT,
  name char(20) NOT NULL,
  manufacturer char(20) NOT NULL,
  style char(20) NOT NULL,
  purchase_price decimal(9,2) NOT NULL,
  sale_price decimal(9,2) NOT NULL,
  qty_on_hand decimal (9,0) NOT NULL,
  comm_pct decimal (5,2) NOT NULL,
  primary key(product_id),
  unique(name, manufacturer, style)
);

INSERT INTO product VALUES
(1, "Velocity Viper 500", "SwiftCycles", "Mountain Bike", 450, 650, 25, 10),
    (2, "Speedster Pro", "BikeMaster", "Road Bike", 550, 750, 30, 12),
    (3, "Urban Commuter", "CityRide Bikes", "Hybrid Bike", 380, 550, 20, 8),
    (4, "Xtreme BMX", "XtremeRides", "BMX Bike", 300, 450, 15, 9),
    (5, "Trailblazer 29er", "AdventureBikes", "Mountain Bike", 480, 680, 28, 11),
    (6, "Racer's Edge", "FastLane Cycles", "Road Bike", 600, 800, 35, 10),
    (7, "City Explorer", "UrbanCycles", "Hybrid Bike", 420, 580, 22, 7),
    (8, "Turbocharged BMX", "TurboBikes", "BMX Bike", 320, 480, 18, 8),
    (9, "Summit Peak", "PeakCycles", "Mountain Bike", 470, 670, 26, 12),
    (10, "Sprint Pro", "Velocity Bikes", "Road Bike", 590, 790, 33, 9),
    (11, "City Cruiser", "UrbanRides", "Hybrid Bike", 410, 570, 24, 7),
    (12, "Extreme Rider", "Velocity Bikes", "Mountain Bike", 490, 690, 29, 10),
    (13, "Speed Demon", "BikeMaster", "Road Bike", 580, 780, 32, 9),
    (14, "Aero Pro BMX", "AeroBikes", "BMX Bike", 330, 490, 16, 8),
    (15, "Explorer Pro", "AdventureBikes", "Mountain Bike", 460, 660, 27, 11),
    (16, "Urban Glide", "CityRide Bikes", "Hybrid Bike", 395, 560, 21, 7),
    (17, "Street Racer", "FastLane Cycles", "Road Bike", 610, 810, 34, 12),
    (18, "Turbocharged Fury", "TurboBikes", "BMX Bike", 340, 500, 17, 8),
    (19, "Summit Rider", "PeakCycles", "Mountain Bike", 480, 680, 28, 10),
    (20, "Sprinter Pro X", "Velocity Bikes", "Road Bike", 600, 800, 33, 9)
;

DROP TABLE IF EXISTS salesperson;
CREATE TABLE salesperson (
  sp_id bigint NOT NULL AUTO_INCREMENT,
  first_name char(20) NOT NULL,
  last_name char(20) NOT NULL,
  street_address char(50) NOT NULL,
  city char(20) NOT NULL,
  state_code char(2) NOT NULL,
  zip_code decimal(5,0) NOT NULL,
  phone_num decimal(10) NOT NULL,
  start_date date NOT NULL,
  termination_date date default NULL,
  manager char(40) NOT NULL,
  primary key(sp_id),
  unique(first_name, last_name, phone_num)
);

INSERT into salesperson VALUES
(1, "John", "Doe", "123 Main St", "Cityville", "CA", "12345", "5551234567", "2023-01-15", null, "David Williams"),
    (2, "Alice", "Johnson", "456 Elm St", "Townsville", "NY", "54321", "5559876543", "2022-05-20", "2023-09-30", "David Williams"),
    (3, "Michael", "Smith", "789 Oak St", "Villageville", "TX", "67890", "5551237890", "2021-12-10", null , "David Williams"),
    (4, "Emily", "Brown", "101 Pine St", "Suburbia", "FL", "45678", "5554567890", "2020-08-15", "2023-05-25", "David Williams"),
    (5, "Sophia", "Davis", "222 Birch St", "Hamletown", "OH", "76543", "5551113333", "2022-02-28", "2023-07-15", "James Anderson"),
    (6, "Liam", "Wilson", "333 Cedar St", "Cityburg", "WA", "98765", "5552225555", "2021-04-05", null, "James Anderson"),
    (7, "Olivia", "Martinez", "444 Maple St", "Suburbville", "IL", "54321", "5554447777", "2019-11-11", "2023-10-01", "James Anderson"),
    (8, "Ethan", "Taylor", "555 Willow St", "Townsville", "NY", "12345", "5555550000", "2023-03-15", null, "James Anderson"),
    (9, "Isabella", "Anderson", "666 Redwood St", "Hometown", "CA", "87654", "5553331111", "2020-06-20", "2023-06-30", "James Anderson"),
    (10, "Mason", "Garcia", "777 Juniper St", "Villageburg", "TX", "23456", "5557778888", "2021-10-10", null, "Sarah Wilson"),
    (11, "Aiden", "Jones", "888 Sequoia St", "Hamletville", "WA", "98765", "5558889999", "2022-07-08", "2023-08-30", "Sarah Wilson"),
    (12, "Ava", "Hernandez", "999 Cedar St", "Citytown", "IL", "12345", "5550005555", "2019-08-12", null, "Sarah Wilson"),
    (13, "Elijah", "Wilson", "123 Oak St", "Townsville", "NY", "76543", "5551114444", "2020-09-17", "2023-10-15", "Sarah Wilson"),
    (14, "Charlotte", "Davis", "234 Pine St", "Suburbia", "TX", "87654", "5552223333", "2022-01-25", null, "Robert Jones"),
    (15, "Lucas", "Smith", "345 Elm St", "Cityburg", "CA", "54321", "5554445555", "2018-11-30", "2023-07-10", "Robert Jones"),
    (16, "Harper", "Garcia", "456 Maple St", "Villagetown", "WA", "23456", "5553337777", "2021-07-04", null, "Robert Jones"),
    (17, "Jackson", "Anderson", "567 Birch St", "Hometownville", "IL", "98765", "5556669999", "2020-03-12", "2023-06-25", "Robert Jones"),
    (18, "Aria", "Martinez", "678 Redwood St", "Hamletburg", "NY", "12345", "5551113333", "2019-04-19", null, "Mary Miller"),
    (19, "Liam", "Johnson", "789 Willow St", "Cityville", "WA", "45678", "5558881111", "2021-02-22", "2023-09-05", "Mary Miller"),
    (20, "Zoe", "Miller", "890 Sequoia St", "Suburbville", "TX", "33322", "5557774444", "2018-12-01", null, "Mary Miller")
    ;

DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
  c_id bigint NOT NULL AUTO_INCREMENT,
  first_name char(20) NOT NULL,
  last_name char(20) NOT NULL,
  street_address char(50) NOT NULL,
  city char(20) NOT NULL,
  state_code char(2) NOT NULL,
  zip_code decimal(5,0) NOT NULL,
  phone_num decimal(10) NOT NULL,
  start_date date NOT NULL,
  primary key(c_id)
);

INSERT into customer VALUES
(1, "Sophie", "Johnson", "321 Oak St", "Villetown", "CA", "54321", "5551112233", "2023-05-10"),
    (2, "Ethan", "Wilson", "432 Maple St", "Hamletville", "NY", "45678", "5559871234", "2023-02-15"),
    (3, "Olivia", "Martinez", "543 Pine St", "Cityville", "TX", "67890", "5555557890", "2022-12-20"),
    (4, "Noah", "Garcia", "654 Elm St", "Suburbia", "IL", "87654", "5557772345", "2021-09-15"),
    (5, "Abigail", "Brown", "765 Birch St", "Hometown", "OH", "98765", "5553335678", "2023-01-30"),
    (6, "Lucas", "Hernandez", "876 Cedar St", "Villageburg", "WA", "76543", "5552227890", "2022-07-05"),
    (7, "Ava", "Davis", "987 Willow St", "Townsville", "NY", "34567", "5554444321", "2022-11-11"),
    (8, "Mia", "Miller", "109 Juniper St", "Cityburg", "NY", "34567", "5554444321", "2022-11-11"),
    (9, "Liam", "Thompson", "210 Redwood St", "Villagetown", "IL", "33322", "5558881234", "2021-05-25"),
    (10, "Ella", "Smith", "321 Sequoia St", "Hometownville", "TX", "12345", "5556662345", "2022-09-15"),
    (11, "William", "Thomas", "432 Cedar St", "Citytown", "WA", "67890", "5557777890", "2023-04-02"),
    (12, "Grace", "Jones", "543 Oak St", "Hamletburg", "NY", "54321", "5553335678", "2023-08-15"),
    (13, "Benjamin", "Harris", "654 Pine St", "Suburbville", "CA", "87654", "5552228765", "2021-12-01"),
    (14, "Avery", "Moore", "765 Elm St", "Villageville", "IL", "98765", "5551234321", "2022-06-30"),
    (15, "Chloe", "Evans", "876 Birch St", "Townsville", "WA", "23456", "5555551234", "2023-01-15"),
    (16, "Daniel", "Roberts", "987 Willow St", "Cityville", "OH", "76543", "5557775678", "2022-03-20"),
    (17, "Sofia", "Adams", "109 Oak St", "Hometown", "CA", "23456", "5558887890", "2021-08-05"),
    (18, "Joseph", "Turner", "210 Maple St", "Suburbia", "NY", "33322", "5551112345", "2022-09-25"),
    (19, "Aubrey", "Parker", "321 Cedar St", "Hamletville", "TX", "54321", "5554448765", "2023-01-10"),
    (20, "Madison", "Watson", "432 Willow St", "Cityburg", "IL", "87654", "5551237890", "2021-07-22")
;


DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  product_id bigint NOT NULL,
  sp_id bigint NOT NULL,
  c_id bigint NOT NULL,
  product_price decimal (9,2) NOT NULL,
  comm_pct decimal (5,2) NOT NULL,
  sales_date date NOT NULL,
  CONSTRAINT fk1 FOREIGN KEY (product_id) REFERENCES product (product_id),
  CONSTRAINT fk2 FOREIGN KEY (sp_id) REFERENCES salesperson (sp_id),
  CONSTRAINT fk3 FOREIGN KEY (c_id) REFERENCES customer (c_id)
);

INSERT into sales VALUES 
( 20 , 2 , 15 , 800 , 9 , "2022-8-8" ),
( 3 , 17 , 14 , 550 , 8 , "2023-6-7" ),
( 15 , 18 , 14 , 660 , 11 , "2023-3-2" ),
( 1 , 10 , 19 , 650 , 7.2 , "2023-2-8" ),
( 2 , 12 , 19 , 750 , 12 , "2022-12-30" ),
( 2 , 8 , 9 , 750 , 12 , "2023-8-10" ),
( 9 , 8 , 11 , 670 , 12 , "2022-4-4" ),
( 6 , 1 , 12 , 800 , 10 , "2023-4-20" ),
( 15 , 12 , 12 , 660 , 11 , "2022-4-26" ),
( 19 , 18 , 17 , 680 , 9.85 , "2022-10-3" ),
( 10 , 13 , 18 , 790 , 9 , "2023-2-6" ),
( 20 , 18 , 18 , 872 , 6.4 , "2023-5-26" ),
( 6 , 4 , 13 , 800 , 10 , "2022-2-21" ),
( 8 , 15 , 2 , 480 , 8 , "2023-02-16" ),
( 4 , 7 , 10 , 450 , 9 , "2022-7-25" ),
( 6 , 7 , 8 , 800 , 10 , "2023-1-21" ),
( 9 , 7 , 8 , 670 , 12 , "2023-4-30" ),
( 19 , 1 , 19 , 676 , 10 , "2022-10-5" ),
( 3 , 17 , 11 , 550 , 8 , "2023-5-19" ),
( 17 , 14 , 3 , 810 , 12 , "2023-2-26" ),
( 1 , 6 , 3 , 650 , 10 , "2022-3-15" ),
( 19 , 6 , 7 , 680 , 10 , "2022-5-26" ),
( 19 , 3 , 6 , 680 , 7.05 , "2022-5-3" ),
( 15 , 13 , 13 , 660 , 11 , "2022-2-27" ),
( 4 , 8 , 11 , 450 , 9 , "2023-2-25" ),
( 3 , 3 , 20 , 550 , 8 , "2022-1-10" ),
( 2 , 18 , 2 , 750 , 12 , "2023-11-19" ),
( 1 , 5 , 1 , 650 , 10 , "2022-11-17" ),
( 16 , 20 , 15 , 560 , 7 , "2023-10-6" ),
( 6 , 5 , 14 , 800 , 10 , "2022-9-1" ),
( 7 , 11 , 3 , 580 , 7 , "2023-2-5" ),
( 5 , 13 , 2 , 748 , 11 , "2022-12-1" ),
( 18 , 1 , 8 , 500 , 8 , "2022-1-9" ),
( 17 , 1 , 12 , 810 , 12 , "2023-3-17" ),
( 10 , 2 , 3 , 718 , 13.1 , "2022-7-12" ),
( 2 , 19 , 10 , 750 , 12 , "2023-8-19" ),
( 9 , 14 , 1 , 670 , 12 , "2022-6-17" ),
( 1 , 18 , 14 , 650 , 8.15 , "2023-10-1" ),
( 9 , 16 , 13 , 750 , 12 , "2022-2-15" ),
( 4 , 12 , 17 , 450 , 9 , "2022-2-6" ),
( 11 , 18 , 18 , 570 , 7 , "2022-12-11" ),
( 10 , 14 , 13 , 790 , 9 , "2023-5-24" ),
( 10 , 13 , 2 , 790 , 9 , "2023-6-21" ),
( 20 , 1 , 13 , 800 , 9 , "2023-2-18" ),
( 13 , 15 , 14 , 813 , 9 , "2023-02-27" ),
( 13 , 8 , 18 , 780 , 9 , "2022-9-19" ),
( 16 , 11 , 13 , 560 , 7 , "2023-01-15" ),
( 8 , 18 , 7 , 541 , 8 , "2022-9-9" ),
( 12 , 2 , 5 , 690 , 10 , "2022-10-31" ),
( 6 , 2 , 4 , 800 , 10 , "2023-8-17" ),
( 3 , 4 , 2 , 550 , 12.85 , "2022-12-2" ),
( 18 , 2 , 8 , 500 , 8 , "2023-2-19" ),
( 11 , 15 , 5 , 610 , 7 , "2023-02-26" ),
( 7 , 5 , 15 , 580 , 9.6 , "2023-7-1" ),
( 16 , 7 , 8 , 560 , 7 , "2023-6-9" ),
( 13 , 17 , 11 , 780 , 9 , "2022-12-21" ),
( 3 , 16 , 19 , 550 , 5.95 , "2023-12-30" ),
( 9 , 20 , 6 , 670 , 12 , "2022-8-8" ),
( 11 , 2 , 13 , 569 , 7 , "2023-8-21" ),
( 11 , 6 , 15 , 582 , 7 , "2023-7-26" ),
( 3 , 15 , 12 , 550 , 8 , "2022-2-10" ),
( 16 , 20 , 19 , 560 , 7 , "2023-7-13" ),
( 13 , 3 , 10 , 731 , 11.4 , "2022-3-15" ),
( 19 , 20 , 14 , 680 , 10 , "2022-1-31" ),
( 1 , 18 , 9 , 650 , 10 , "2022-2-8" ),
( 2 , 4 , 20 , 764 , 12 , "2023-4-30" ),
( 13 , 10 , 5 , 780 , 10.45 , "2023-9-21" ),
( 10 , 19 , 7 , 790 , 9 , "2022-9-27" ),
( 11 , 9 , 1 , 570 , 7 , "2023-4-17" ),
( 20 , 18 , 7 , 705 , 4.5 , "2022-2-3" ),
( 12 , 7 , 20 , 624 , 10 , "2023-8-3" ),
( 2 , 5 , 11 , 750 , 12 , "2022-12-12" ),
( 12 , 11 , 4 , 690 , 10 , "2023-6-2" ),
( 7 , 2 , 16 , 580 , 7 , "2022-2-13" ),
( 16 , 17 , 6 , 560 , 7 , "2022-11-30" )
;
DROP TABLE IF EXISTS discount;
CREATE TABLE discount (
  product_id bigint NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  d_pct decimal(5,2),
  CONSTRAINT fk4 FOREIGN KEY (product_id) REFERENCES product (product_id)
);

INSERT into discount VALUES 
( 13, "2022-4-9", "2023-1-25", 1.16 ),
( 3, "2022-3-10", "2022-12-18", 19.46 ),
( 16, "2022-11-13", "2023-3-18", 6.1 ),
( 14, "2022-5-24", "2022-5-30", 2.22 ),
( 2, "2022-6-29", "2022-10-30", 18.32 ),
( 18, "2023-6-30", "2023-11-30", 19.52 ),
( 16, "2023-11-12", "2023-12-31", 19.9 ),
( 7, "2022-2-26", "2022-10-31", 1.74 ),
( 2, "2023-8-29", "2023-10-31", 18.94 ),
( 12, "2022-10-8", "2023-1-16", 0.08 ),
( 3, "2022-10-10", "2023-10-5", 14.18 ),
( 16, "2022-8-2", "2022-12-12", 11.64 ),
( 11, "2022-8-11", "2022-11-20", 2.92 ),
( 11, "2023-6-19", "2023-8-24", 1.9 ),
( 4, "2023-1-5", "2023-6-19", 13.08 ),
( 5, "2022-7-17", "2022-10-17", 4.26 ),
( 8, "2023-9-5", "2023-10-24", 5.22 ),
( 10, "2023-4-17", "2023-7-24", 17.4 ),
( 4, "2022-10-14", "2023-11-12", 11.72 ),
( 8, "2023-9-15", "2023-10-29", 7.18 )
;

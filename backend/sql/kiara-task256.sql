CREATE TABLE Vendors (
VendorID int not null IDENTITY(1,1),
Vendor varchar(255) not null,
PRIMARY KEY(VendorID)
);


CREATE TABLE Locations (
LocationID int NOT NULL IDENTITY(1,1),
LocationName varchar(255) not null,
StreetAddress varchar(255) not null,
City varchar(255) not null,
State varchar(2) not null, 
ZipCode varchar(15) not null,
PhoneNum varchar(25) not null,
PRIMARY KEY (LocationID)
);

CREATE TABLE Machines(
MachineID int not null identity(1,1) primary key,
Model varchar(255) not null,
ModelNum varchar(255) not null,
SerialNum varchar(255) not null,
ModelPhoto varchar(500) null,
Status varchar(255) null,
StatusDescription varchar(255) null,
VendorID int not null FOREIGN KEY REFERENCES Vendors(VendorID),
LocationID int not null FOREIGN KEY REFERENCES Locations(LocationID)
);


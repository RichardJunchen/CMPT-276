BGC Engineering Inventory Store Project Proposal








Members: 
Tommy Chang
Abiel Kim
Wenqing Liu
Junchen Li
Mohamed Moataz Jmal

Project Name:
BGC Inventory Store
 
Overview of the Inventory Store:
BGC internal website designed for staff members to request promotional items and gear for both personal and client benefits. 
 
Overview of the issues in the existing web application:
The current web application uses technologies such as Microsoft Sharepoint, Microsoft SQL Server as the backend to keep record of the virtual store inventory. However, certain functionalities, in particular server-side calculations, fail and result in incorrect values in the database.  As for the front-end, the UI is fairly dated; the user experience is lacking in terms of user friendliness, design, and appeal.
 
How will the problems be solved:
This project consists of a complete revamping of the existing site. Front-end technologies such as HTML/CSS/JavaScript will be used to provide a better user experience. The backend will use Node.js as a server-side language with a PostgreSQL/MySQL database. The new web application will provide the most integral functions of the existing inventory store along with additional features if time permits. 
 
How will this project make life better? 
The new website will provide a better user experience for BGC staff members. On the staff (member) side, the website will be easier to navigate and use. On the administrative (admin team) side, users will no longer have to manually correct invalid entries in the database with new valid server-logic, reducing human errors.
 
Scope of the project:
The scope of the project is to develop an E-commerce website with two user roles views: Staff and Administrator. The 2 main features are for staff members to be able to make requests for available items, and for administrators to fulfill those requests. There are also many other individual features such as generating reports.
The epics of our project is to:
Ability to login using the Azure Active Directory API (Iteration 1)
Ability to view/filter items on a shopping page (client)  (Iteration 1)
Ability to create an order for a Personal or Client request
Ability to modify an order’s request status as an Administrator
Status: Waitlist/Completed/Cancelled/Submitted
Implement server-side logic to handle updating of values (item quantity)
Ability to view all items in the database (shopping page - filtered, staff) 
Ability to view/edit items in the database (admin)
Ability to view all requests (admin-side). Perhaps filter by status.
This is a tentative ordering of Epics and may change based on priority.
 
Sample of User Stories:
Task: Logging in
Staff/Administrator is able to log in to the website using their BGC Outlook credentials
Task: Viewing landing page
After logging in, the user is redirected to a landing page. The landing page will consist of headings that will redirect the user to a product viewing page or other additional information/guidelines.
Task: Creating an order and adding items
When the user adds an item, an order(cart) will be created if not already. Further additions will be placed in the cart. 
Task: Filling order information
When the user checks out their cart, they will have to fill out a form with their information and agree to BGC internal policies.
Task: Editing Inventory (Admin) 
An administrator should be able to edit existing inventory (adding new item, updating values, deleting)
Task: Processing orders (Admin)
An administrator should be able to process an order waiting for approval. This means changing the order status, and fulfilling the request (either completed or rejected).
 

 
 


CREATE TABLE subjects (
  subject_id INT PRIMARY KEY,
  subject_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE quiz_data (
  ques_no SERIAL PRIMARY KEY,
  subject_id INT NOT NULL,
  question VARCHAR(200) NOT NULL,
  option1 VARCHAR(200) NOT NULL,
  option2 VARCHAR(200) NOT NULL,
  option3 VARCHAR(200) NOT NULL,
  option4 VARCHAR(200) NOT NULL,
  correct_option VARCHAR(200) NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);


 

insert into subjects (subject_id, subject_name) 

values (100, 'HTML');

insert into subjects (subject_id, subject_name)

values (200, 'CSS');

insert into subjects (subject_id, subject_name)

values (300, 'Python');

insert into subjects (subject_id, subject_name)

values (400, 'JavaScript');



drop table quiz_data;

drop table subjects;

insert into quiz_data (subject_id, question, option1, option2, option3, option4, correct_option)

values 
 
 (100, 'Which attribute is used to specify the URL of the image in the img tag?', 'url', 'href', 'src','link','src'),

 (100, 'Which attribute is used to specify the alternative text for an image?', 'title', 'alt', 'caption','description','alt'),

 (100, 'Which attribute is used to define the font size in HTML?', 'font-size', 'size', 'fontsize','font','font-size'),

 (100, 'What does HTML stand for?', 'Hyper Text Markup Language', 'Highly Textual Markup Language', 'Hyperlink and Text Markup Language','Hyperlink Text Manipulation Language','Hyper Text Markup Language'),

 (100, 'How can you create an ordered list in HTML?', 'ul', 'ol', 'li', 'list', 'ol'),
 

 (200, 'Which property is used to add spacing between lines of text in CSS?', 'line-spacing', 'line-height', 'spacing', 'text-spacing', 'line-height'),

 (200, 'Which property is used to align text in CSS?', 'text-align', 'align-text', 'text-alignment', 'alignment', 'text-align'),

 (200, 'Which property is used to set the space between elements in CSS?', 'margin', 'padding', 'spacing', 'border-spacing', 'margin'),

 (200,'Which property is used to set the background color in CSS?','bg-color','background-color','background','bgcolor','background-color'),

 (200,'Which property is used to make text bold in CSS?','text-style','font-weight','bold','text-bold','font-weight'),


 (300, 'Which keyword is used to create a class in Python?', 'function', 'class', 'def', 'object', 'class'),
 
 (300, 'Which method is used to append an item to a list in Python?', 'add()', 'append()', 'insert()', 'push()', 'append()'),

 (300,'Which data type is used to store a sequence of characters in Python?','int','char','string','float','string'),

 (300,'What is the output of the following code? \n print(5 > 2)','True','False','Error','None of the above','True'),

 (300,'Which loop is used to iterate over a sequence of elements in Python?','for loop','while loop','do-while loop','repeat loop','for loop'),


 (400, 'How can you add a comment in JavaScript?', '// This is a comment', '/* This is a comment */', '<!-- This is a comment -->', '# This is a comment', '// This is a comment'),

 (400, 'Which keyword is used to define a constant in JavaScript?', 'var', 'let', 'const', 'constant', 'const'),

 (400,'Which keyword is used to declare a variable in JavaScript?','var','let','const','declare','var'),

 (400, 'Which method is used to remove the last element from an array in JavaScript?', 'pop()', 'push()', 'shift()', 'unshift()', 'pop()'),

 (400,'Which event is triggered when a user clicks on an HTML element in JavaScript?','onhover','onchange','onclick','onsubmit','onclick');



create table users (

  id serial,

  username varchar(100),

  email varchar(100),

  password varchar(50),

  otp int

)
select *from users;
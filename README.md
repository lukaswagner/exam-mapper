# exam-mapper
maps a list of students to a set of randomized exams

generate a map:
`npm start -- map exampleStudents.txt 255`

generate a map with file sharing urls:
`npm start -- map exampleStudents.txt 255 -u "example.com/share/{hash}"`

look up a student:
`npm start -- get 1000`

look up a hash:
`npm start -- get dd -h`

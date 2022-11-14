import express from 'express';

// import apiRoute from '/routes/apiRoute';
// import htmlRoute from '/rotues/htmlRoute';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// app.use('/', htmlRoute);
// app.use('/api', apiRoute);

app.listen(PORT, () => {
    console.log(`listening on http:localhost:${PORT}`)
})


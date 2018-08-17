
import * as express from 'express';
import {Application} from 'express';
import {readAllLessons} from './read-all-lessons.route';
import {addPushSubscriber} from './add-push-subscriber.route';
import {sendNewsletter} from './send-newsletter.route';
import {getAllCourses, getCourseById} from './get-courses.route';
import {searchLessons} from './search-lessons.route';
import {loginUser} from './auth.route';
import {saveCourse} from './save-course.route';

const bodyParser = require('body-parser');

const webpush = require('web-push');

const vapidKeys = {
    'publicKey':'BEOk30HU47bL1j_tREo16lVsOeTonuUBx7lYEM8xXdaGFt16Yo4vPS_9JM1ARlfceov2fWpNrIWueez2dJLw1_g',
    'privateKey':'bWdtHbt6n47BcNhFykCODGX1qquVg-zMnaaM_XAb0_Y'
};


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);




const app: Application = express();


app.use(bodyParser.json());


app.route('/api/login').post(loginUser);

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').put(saveCourse);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);



// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});










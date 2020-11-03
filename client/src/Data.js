export default class Data {

    // Template function for each api call
    api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = 'http://localhost:5000/api' + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options)
    }

    // Function to fetch user, using the provided email and password
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // Function to update a specific course which is found using the course Id, checked that it can be updated using the credentials provided and then using 'course' with the new details
    async updateCourse(courseId, course, emailAddress, password) {
        const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, { emailAddress, password } );
        if (response.status === 204) {
            return [];
        }
        else if (response.status === 401 || response.status === 400) {
            // console.log(response.json().then(data => console.log(data)))
            return response.json().then(data => {
                return data.message;
            });
        }
        else {
            throw new Error();
        }
    }

    // Create a new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // Create a new course, pass the credentials that link this course to a specific user
    async createCourse(newCourse, emailAddress, password,) {
        const response = await this.api('/courses', 'POST', newCourse, true, { emailAddress, password} );
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // Get courses
    async getCourses() {
        const response = await this.api('/courses', 'GET', null, false);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // Get specific course by id
    async getCoursesById(id) {
        const response = await this.api(`/courses/${id}`, 'GET', null, false);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // Delete a course using id to identify it and check that it can be accessed by specific user using the passed credentials
    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
        if (response.status === 204) {
            return response;
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }
}
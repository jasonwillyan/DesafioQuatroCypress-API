class Requests {
    getPing() {
        return cy.request({
            method: 'GET',
            url: '/ping',
        });
    }

    getBooking() {
        return cy.request({
            method: 'GET',
            url: 'booking/1',
        })
    }

    postBooking() {
        return cy.request({
            method: 'POST',
            url: 'booking',
            body:
            {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates":
                {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                //"additionalneeds": "Breakfast" -> erro(additionalneeds = undefined satisfies: spok.string)
            }
        })
    }

    updateBookingWithoutToken(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            body:
            {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    updateBooking(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers:
            {
                cookie: `token=${Cypress.env('token')}`
            },
            body:
            {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    updateBookingTokenInvalid(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers:
            {
                cookie: `token=${Cypress.env('token')}` + "1"
            },
            body:
            {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    updateBookingIdInvalid() {
        const id = 12345;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers:
            {
                cookie: `token=${Cypress.env('token')}`
            },
            body:
            {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    postAuth() {
        return cy.request
            ({
                method: 'POST',
                url: 'auth',
                body:
                {
                    "username": "admin",
                    "password": "password123"
                }
            });
    }

    doAuth() {
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token;
            Cypress.env('token', token);
        })
    }

    deleteBooking(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers:
            {
                cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        });
    }

    deleteBookingIdInvalid() {
        const id = 54321;

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers:
            {
                cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        });
    }

    deleteBookingWithoutToken(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers:
            {
                cookie: ""
            },
            failOnStatusCode: false
        });
    }

    deleteBookingTokenInvalid(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers:
            {
                cookie: `token=${Cypress.env('token')}` + "a"
            },
            failOnStatusCode: false
        });
    }
}

export default new Requests();
require('dotenv').config()
const chai = require("chai")
const expect = chai.expect
const request = require('supertest')
const assert = require('assert')
const fetch = require('node-fetch')
const users = require('../users/model/users')
const app = require("../index")

describe('#register()', function () {
    it(`User register`, async () => { //no ingreso algunos datos
		const url = `http://localhost:8080/auth/register` 
		await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"name": "test",
				"lastname": "test",
				"email": "test@gmail.com", 
				"phoneNumber": "123",
				"password": "test123",
                "repeatPassword": "test123"
			})
		})
			.then(response => response.json())
			.then(data => {
				assert.equal(data.msg, 'usuario creado')
			})
	})

    it(`Fill in all the fields`, async () => { //no ingreso algunos datos
		const url = `http://localhost:8080/auth/register` 
		await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"name": "juan",
				"lastname": "",
				"email": "admin@gmail.com", 
				"phoneNumber": "",
				"password": "admin",
                "repeatPassword": ""
			})
		})
			.then(response => response.json())
			.then(data => {
				assert.equal(data.msg, 'Faltan datos')
			})
	})

	it(`The email is in use`, async () => { //ingreso un email ya usado
		const url = `http://localhost:8080/auth/register` 
		await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"name": "juan",
				"lastname": "juan",
				"email": "admin@gmail.com", 
				"phoneNumber": 12345,
				"password": "admin",
                "repeatPassword": "admin"
			})
		})
			.then(response => response.json())
			.then(data => {
				assert.equal(data.msg, 'The email already exists')
			})
	})

    it(`The email has invalid characters`, async () => { //ingreso caracteres invalidos para un email
		const url = `http://localhost:8080/auth/register` 
		await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"name": "juan",
				"lastname": "juan",
				"email": "$%&^#2^4$#%^*5", 
				"phoneNumber": 12345,
				"password": "admin",
                "repeatPassword": "admin"
			})
		})
			.then(response => response.json())
			.then(data => {
				assert.equal(data.msg, 'The email has invalid characters')
			})
	})
})

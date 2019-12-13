const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');


// mock creation of TodoModel. Note: we are not testing whether Mongoose actually creates a model.
TodoModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
    // Mock request/response
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe('TodoController.createTodo', () => {

    beforeEach(() => {
        // Mock request with data
        req.body = newTodo;
    });

    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });

    it('should call TodoModel.create', () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    it('should return 201 response code', () => {
        TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBe(true);
    });

    it('should return JSON body in response', () => {
        TodoModel.create.mockReturnValue(newTodo);
        TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })

});
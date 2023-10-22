const { signup } = require('../../controllers/authController');
const User = require('../../models/user');

// Mock the User.findOne method before running the test
jest.mock('../../models/user');

const request = {
  body: {
    name: 'mery',
    email: 'mery@gmail.com',
    password: '12345678',
    role: 'manager',
  },
};

const response = {
  status: jest.fn((x) => x).mockReturnThis(),
};

it('should send a status code of 400 when user exists', async () => {
  // Mock the implementation of findOne for this specific test case
   User.findOne.mockImplementationOnce(() => ({
 
    email: 'mery@gmail.com',
    
  }));

  // Call your signup function with the mock request and response objects
  await signup(request, response);

  // Perform your assertions
  expect(response.status).toHaveBeenCalledWith(400);

  // Restore the original implementation of findOne after the test
 
});

import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { dbcontext } from "../utils/drizzle"; // Your database context
import { getRoleOfUser } from "../src/repositories/permission"; // The function to test
import sinon from "sinon";

// Mock data for the test
const mockRoles = [
  { id: 1, name: "admin", description: "Admin role" },
  { id: 2, name: "student", description: "Student role" },
  { id: 3, name: "alumni", description: "Alumni role" },
  { id: 4, name: "mis_employee", description: "MIS Employee role" },
  { id: 5, name: "platform_admin", description: "Platform Admin role" },
];

const mockUserRoles = [
  { id: 1, userid: "8e1d04af-25c1-469b-8acb-3c245f104f20", roleid: 2 },
];

const mockData = [{ roleName: "student" }]; // Expected result

describe("getRoleOfUser", () => {
  let selectStub: sinon.SinonStub;

  beforeEach(() => {
    // Stub the `select` method and its chainable methods
    selectStub = sinon.stub(dbcontext, "select").returns({
      from: sinon.stub().returnsThis(),
      innerJoin: sinon.stub().returnsThis(),
    //   where: sinon.stub().returnsThis(),
    where: sinon.stub().resolves(mockRoles),
      orderBy: sinon.stub().returnsThis(), // Add orderBy to the mocked chain
    } as any);
  });

  afterEach(() => {
    // Restore the original methods after each test
    sinon.restore();
  });

  it("should return the role of the user", async () => {
    // Mock the final resolved value for the query chain
    selectStub().where.resolves(mockData);

    // Act
    const result = await getRoleOfUser(mockUserRoles[0].userid);

    // Assert
    expect(result).toEqual(mockData); // Check if the result matches the mock data
    expect(selectStub.calledOnce).toBe(true); // Ensure the `select` method was called
  });

  it("should return an empty array if no role is found for the user", async () => {
    // Mock the final resolved value to return an empty array
    selectStub().where.resolves([]);

    // Act
    const result = await getRoleOfUser(mockUserRoles[0].userid);

    // Assert
    expect(result).toEqual([]); // Check if the result is an empty array
    expect(selectStub.calledOnce).toBe(true); // Ensure the `select` method was called
  });
});

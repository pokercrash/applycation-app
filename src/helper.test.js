import { handleLogin, getUserFromSession, getTokenFromSession, handleLogout } from "./helper";
import { jwtDecode } from "jwt-decode";

// Mock `jwtDecode`
jest.mock("jwt-decode", () => jest.fn());

describe("Utility Functions", () => {
  beforeEach(() => {
    sessionStorage.clear(); // Clear sessionStorage before each test
  });

  describe("handleLogin", () => {
    it("should store the token in sessionStorage and return true", () => {
      const credentials = { token: "test-token" };

      const result = handleLogin(credentials);

      expect(result).toBe(true);
      expect(sessionStorage.getItem("jwtToken")).toBe("test-token");
    });
  });

  describe("getTokenFromSession", () => {
    it("should retrieve the token from sessionStorage", () => {
      sessionStorage.setItem("jwtToken", "test-token");

      const token = getTokenFromSession();

      expect(token).toBe("test-token");
    });

    it("should return null if no token exists in sessionStorage", () => {
      const token = getTokenFromSession();

      expect(token).toBeNull();
    });
  });

  describe("handleLogout", () => {
    it("should remove the token from sessionStorage", () => {
      sessionStorage.setItem("jwtToken", "test-token");

      handleLogout();

      expect(sessionStorage.getItem("jwtToken")).toBeNull();
    });
  });
});

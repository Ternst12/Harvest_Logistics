/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userName
      email
      phone
      vehicle {
        id
        userID
        userMail
        type
        latitude
        longitude
        heading
        fillLevel
        openToConnection
        createdAt
        updatedAt
      }
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        email
        phone
        vehicle {
          id
          userID
          userMail
          type
          latitude
          longitude
          heading
          fillLevel
          openToConnection
          createdAt
          updatedAt
        }
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($userID: ID!) {
    getVehicle(userID: $userID) {
      id
      userID
      userMail
      type
      latitude
      longitude
      heading
      fillLevel
      openToConnection
      createdAt
      updatedAt
    }
  }
`;
export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $userID: ID
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVehicles(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        userMail
        type
        latitude
        longitude
        heading
        fillLevel
        openToConnection
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConnection = /* GraphQL */ `
  query GetConnection($id: ID!) {
    getConnection(id: $id) {
      id
      driverOne_UserID
      driverTwo_UserID
      driverOne_UserProfile {
        id
        userName
        email
        phone
        vehicle {
          id
          userID
          userMail
          type
          latitude
          longitude
          heading
          fillLevel
          openToConnection
          createdAt
          updatedAt
        }
        isActive
        createdAt
        updatedAt
      }
      driverTwo_UserProfile {
        id
        userName
        email
        phone
        vehicle {
          id
          userID
          userMail
          type
          latitude
          longitude
          heading
          fillLevel
          openToConnection
          createdAt
          updatedAt
        }
        isActive
        createdAt
        updatedAt
      }
      driverOne_Message
      driverTwo_Message
      createdAt
      updatedAt
    }
  }
`;
export const listConnections = /* GraphQL */ `
  query ListConnections(
    $filter: ModelConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        driverOne_UserID
        driverTwo_UserID
        driverOne_UserProfile {
          id
          userName
          email
          phone
          isActive
          createdAt
          updatedAt
        }
        driverTwo_UserProfile {
          id
          userName
          email
          phone
          isActive
          createdAt
          updatedAt
        }
        driverOne_Message
        driverTwo_Message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActivityOverview = /* GraphQL */ `
  query GetActivityOverview($id: ID!) {
    getActivityOverview(id: $id) {
      id
      activeUsers {
        id
        userName
        email
        phone
        vehicle {
          id
          userID
          userMail
          type
          latitude
          longitude
          heading
          fillLevel
          openToConnection
          createdAt
          updatedAt
        }
        isActive
        createdAt
        updatedAt
      }
      inActiveUsers {
        id
        userName
        email
        phone
        vehicle {
          id
          userID
          userMail
          type
          latitude
          longitude
          heading
          fillLevel
          openToConnection
          createdAt
          updatedAt
        }
        isActive
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listActivityOverviews = /* GraphQL */ `
  query ListActivityOverviews(
    $filter: ModelActivityOverviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivityOverviews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        activeUsers {
          id
          userName
          email
          phone
          isActive
          createdAt
          updatedAt
        }
        inActiveUsers {
          id
          userName
          email
          phone
          isActive
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

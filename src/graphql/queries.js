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
        HeadingToCombine
        createdAt
        updatedAt
      }
      geofenceSettings {
        id
        userID
        geofenceName
        geofenceRadius
        geofence_latitude
        geofence_longitude
        createdAt
        updatedAt
      }
      isActive
      operation_created
      operation_invited
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
          HeadingToCombine
          createdAt
          updatedAt
        }
        geofenceSettings {
          id
          userID
          geofenceName
          geofenceRadius
          geofence_latitude
          geofence_longitude
          createdAt
          updatedAt
        }
        isActive
        operation_created
        operation_invited
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
      HeadingToCombine
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
        HeadingToCombine
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
          HeadingToCombine
          createdAt
          updatedAt
        }
        geofenceSettings {
          id
          userID
          geofenceName
          geofenceRadius
          geofence_latitude
          geofence_longitude
          createdAt
          updatedAt
        }
        isActive
        operation_created
        operation_invited
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
          HeadingToCombine
          createdAt
          updatedAt
        }
        geofenceSettings {
          id
          userID
          geofenceName
          geofenceRadius
          geofence_latitude
          geofence_longitude
          createdAt
          updatedAt
        }
        isActive
        operation_created
        operation_invited
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
          operation_created
          operation_invited
          createdAt
          updatedAt
        }
        driverTwo_UserProfile {
          id
          userName
          email
          phone
          isActive
          operation_created
          operation_invited
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
          HeadingToCombine
          createdAt
          updatedAt
        }
        geofenceSettings {
          id
          userID
          geofenceName
          geofenceRadius
          geofence_latitude
          geofence_longitude
          createdAt
          updatedAt
        }
        isActive
        operation_created
        operation_invited
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
          HeadingToCombine
          createdAt
          updatedAt
        }
        geofenceSettings {
          id
          userID
          geofenceName
          geofenceRadius
          geofence_latitude
          geofence_longitude
          createdAt
          updatedAt
        }
        isActive
        operation_created
        operation_invited
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
          operation_created
          operation_invited
          createdAt
          updatedAt
        }
        inActiveUsers {
          id
          userName
          email
          phone
          isActive
          operation_created
          operation_invited
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
export const getCords = /* GraphQL */ `
  query GetCords($id: ID!) {
    getCords(id: $id) {
      latitude
      longitude
      id
      createdAt
      updatedAt
    }
  }
`;
export const listCords = /* GraphQL */ `
  query ListCords(
    $filter: ModelCordsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        latitude
        longitude
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlace = /* GraphQL */ `
  query GetPlace($id: ID!) {
    getPlace(id: $id) {
      id
      name
      created_By_User_With_ID
      created_By_User {
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
          HeadingToCombine
          createdAt
          updatedAt
        }
        geofenceSettings {
          id
          userID
          geofenceName
          geofenceRadius
          geofence_latitude
          geofence_longitude
          createdAt
          updatedAt
        }
        isActive
        operation_created
        operation_invited
        createdAt
        updatedAt
      }
      placeCords
      createdAt
      updatedAt
    }
  }
`;
export const listPlaces = /* GraphQL */ `
  query ListPlaces(
    $filter: ModelPlaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        created_By_User_With_ID
        created_By_User {
          id
          userName
          email
          phone
          isActive
          operation_created
          operation_invited
          createdAt
          updatedAt
        }
        placeCords
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGeofenceSetting = /* GraphQL */ `
  query GetGeofenceSetting($userID: ID!) {
    getGeofenceSetting(userID: $userID) {
      id
      userID
      geofenceName
      geofenceRadius
      geofence_latitude
      geofence_longitude
      createdAt
      updatedAt
    }
  }
`;
export const listGeofenceSettings = /* GraphQL */ `
  query ListGeofenceSettings(
    $userID: ID
    $filter: ModelGeofenceSettingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGeofenceSettings(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        geofenceName
        geofenceRadius
        geofence_latitude
        geofence_longitude
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getParticipant = /* GraphQL */ `
  query GetParticipant($OperationId: ID!) {
    getParticipant(OperationId: $OperationId) {
      OperationId
      UserId
      VehicleType
      createdAt
      updatedAt
    }
  }
`;
export const listParticipants = /* GraphQL */ `
  query ListParticipants(
    $OperationId: ID
    $filter: ModelParticipantFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listParticipants(
      OperationId: $OperationId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        OperationId
        UserId
        VehicleType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOperation = /* GraphQL */ `
  query GetOperation($id: ID!) {
    getOperation(id: $id) {
      id
      CreatorId
      OperationName
      Participants
      createdAt
      updatedAt
    }
  }
`;
export const listOperations = /* GraphQL */ `
  query ListOperations(
    $filter: ModelOperationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOperations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        CreatorId
        OperationName
        Participants
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

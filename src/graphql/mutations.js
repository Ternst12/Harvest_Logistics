/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createVehicle = /* GraphQL */ `
  mutation CreateVehicle(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
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
export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
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
export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
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
export const createConnection = /* GraphQL */ `
  mutation CreateConnection(
    $input: CreateConnectionInput!
    $condition: ModelConnectionConditionInput
  ) {
    createConnection(input: $input, condition: $condition) {
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
export const updateConnection = /* GraphQL */ `
  mutation UpdateConnection(
    $input: UpdateConnectionInput!
    $condition: ModelConnectionConditionInput
  ) {
    updateConnection(input: $input, condition: $condition) {
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
export const deleteConnection = /* GraphQL */ `
  mutation DeleteConnection(
    $input: DeleteConnectionInput!
    $condition: ModelConnectionConditionInput
  ) {
    deleteConnection(input: $input, condition: $condition) {
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
export const createActivityOverview = /* GraphQL */ `
  mutation CreateActivityOverview(
    $input: CreateActivityOverviewInput!
    $condition: ModelActivityOverviewConditionInput
  ) {
    createActivityOverview(input: $input, condition: $condition) {
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
export const updateActivityOverview = /* GraphQL */ `
  mutation UpdateActivityOverview(
    $input: UpdateActivityOverviewInput!
    $condition: ModelActivityOverviewConditionInput
  ) {
    updateActivityOverview(input: $input, condition: $condition) {
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
export const deleteActivityOverview = /* GraphQL */ `
  mutation DeleteActivityOverview(
    $input: DeleteActivityOverviewInput!
    $condition: ModelActivityOverviewConditionInput
  ) {
    deleteActivityOverview(input: $input, condition: $condition) {
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

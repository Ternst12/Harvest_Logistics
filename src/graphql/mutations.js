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
      travelingRecords {
        items {
          id
          userId
          operationId
          recordData
          entryArray
          exitArray
          createdAt
          updatedAt
        }
        nextToken
      }
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
      travelingRecords {
        items {
          id
          userId
          operationId
          recordData
          entryArray
          exitArray
          createdAt
          updatedAt
        }
        nextToken
      }
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
      travelingRecords {
        items {
          id
          userId
          operationId
          recordData
          entryArray
          exitArray
          createdAt
          updatedAt
        }
        nextToken
      }
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
      HeadingToCombine
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
      HeadingToCombine
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
      HeadingToCombine
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
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
        travelingRecords {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCords = /* GraphQL */ `
  mutation CreateCords(
    $input: CreateCordsInput!
    $condition: ModelCordsConditionInput
  ) {
    createCords(input: $input, condition: $condition) {
      latitude
      longitude
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateCords = /* GraphQL */ `
  mutation UpdateCords(
    $input: UpdateCordsInput!
    $condition: ModelCordsConditionInput
  ) {
    updateCords(input: $input, condition: $condition) {
      latitude
      longitude
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteCords = /* GraphQL */ `
  mutation DeleteCords(
    $input: DeleteCordsInput!
    $condition: ModelCordsConditionInput
  ) {
    deleteCords(input: $input, condition: $condition) {
      latitude
      longitude
      id
      createdAt
      updatedAt
    }
  }
`;
export const createPlace = /* GraphQL */ `
  mutation CreatePlace(
    $input: CreatePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    createPlace(input: $input, condition: $condition) {
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
        travelingRecords {
          nextToken
        }
        createdAt
        updatedAt
      }
      placeCords
      createdAt
      updatedAt
    }
  }
`;
export const updatePlace = /* GraphQL */ `
  mutation UpdatePlace(
    $input: UpdatePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    updatePlace(input: $input, condition: $condition) {
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
        travelingRecords {
          nextToken
        }
        createdAt
        updatedAt
      }
      placeCords
      createdAt
      updatedAt
    }
  }
`;
export const deletePlace = /* GraphQL */ `
  mutation DeletePlace(
    $input: DeletePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    deletePlace(input: $input, condition: $condition) {
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
        travelingRecords {
          nextToken
        }
        createdAt
        updatedAt
      }
      placeCords
      createdAt
      updatedAt
    }
  }
`;
export const createGeofenceSetting = /* GraphQL */ `
  mutation CreateGeofenceSetting(
    $input: CreateGeofenceSettingInput!
    $condition: ModelGeofenceSettingConditionInput
  ) {
    createGeofenceSetting(input: $input, condition: $condition) {
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
export const updateGeofenceSetting = /* GraphQL */ `
  mutation UpdateGeofenceSetting(
    $input: UpdateGeofenceSettingInput!
    $condition: ModelGeofenceSettingConditionInput
  ) {
    updateGeofenceSetting(input: $input, condition: $condition) {
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
export const deleteGeofenceSetting = /* GraphQL */ `
  mutation DeleteGeofenceSetting(
    $input: DeleteGeofenceSettingInput!
    $condition: ModelGeofenceSettingConditionInput
  ) {
    deleteGeofenceSetting(input: $input, condition: $condition) {
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
export const createParticipant = /* GraphQL */ `
  mutation CreateParticipant(
    $input: CreateParticipantInput!
    $condition: ModelParticipantConditionInput
  ) {
    createParticipant(input: $input, condition: $condition) {
      OperationId
      UserId
      VehicleType
      createdAt
      updatedAt
    }
  }
`;
export const updateParticipant = /* GraphQL */ `
  mutation UpdateParticipant(
    $input: UpdateParticipantInput!
    $condition: ModelParticipantConditionInput
  ) {
    updateParticipant(input: $input, condition: $condition) {
      OperationId
      UserId
      VehicleType
      createdAt
      updatedAt
    }
  }
`;
export const deleteParticipant = /* GraphQL */ `
  mutation DeleteParticipant(
    $input: DeleteParticipantInput!
    $condition: ModelParticipantConditionInput
  ) {
    deleteParticipant(input: $input, condition: $condition) {
      OperationId
      UserId
      VehicleType
      createdAt
      updatedAt
    }
  }
`;
export const createOperation = /* GraphQL */ `
  mutation CreateOperation(
    $input: CreateOperationInput!
    $condition: ModelOperationConditionInput
  ) {
    createOperation(input: $input, condition: $condition) {
      id
      CreatorId
      OperationName
      Participants
      createdAt
      updatedAt
    }
  }
`;
export const updateOperation = /* GraphQL */ `
  mutation UpdateOperation(
    $input: UpdateOperationInput!
    $condition: ModelOperationConditionInput
  ) {
    updateOperation(input: $input, condition: $condition) {
      id
      CreatorId
      OperationName
      Participants
      createdAt
      updatedAt
    }
  }
`;
export const deleteOperation = /* GraphQL */ `
  mutation DeleteOperation(
    $input: DeleteOperationInput!
    $condition: ModelOperationConditionInput
  ) {
    deleteOperation(input: $input, condition: $condition) {
      id
      CreatorId
      OperationName
      Participants
      createdAt
      updatedAt
    }
  }
`;
export const createRecords = /* GraphQL */ `
  mutation CreateRecords(
    $input: CreateRecordsInput!
    $condition: ModelRecordsConditionInput
  ) {
    createRecords(input: $input, condition: $condition) {
      id
      userId
      operationId
      operation {
        id
        CreatorId
        OperationName
        Participants
        createdAt
        updatedAt
      }
      recordData
      entryArray
      exitArray
      createdAt
      updatedAt
    }
  }
`;
export const updateRecords = /* GraphQL */ `
  mutation UpdateRecords(
    $input: UpdateRecordsInput!
    $condition: ModelRecordsConditionInput
  ) {
    updateRecords(input: $input, condition: $condition) {
      id
      userId
      operationId
      operation {
        id
        CreatorId
        OperationName
        Participants
        createdAt
        updatedAt
      }
      recordData
      entryArray
      exitArray
      createdAt
      updatedAt
    }
  }
`;
export const deleteRecords = /* GraphQL */ `
  mutation DeleteRecords(
    $input: DeleteRecordsInput!
    $condition: ModelRecordsConditionInput
  ) {
    deleteRecords(input: $input, condition: $condition) {
      id
      userId
      operationId
      operation {
        id
        CreatorId
        OperationName
        Participants
        createdAt
        updatedAt
      }
      recordData
      entryArray
      exitArray
      createdAt
      updatedAt
    }
  }
`;

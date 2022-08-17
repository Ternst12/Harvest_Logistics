/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onCreateVehicle(filter: $filter) {
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
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onUpdateVehicle(filter: $filter) {
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
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onDeleteVehicle(filter: $filter) {
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
export const onCreateConnection = /* GraphQL */ `
  subscription OnCreateConnection(
    $filter: ModelSubscriptionConnectionFilterInput
  ) {
    onCreateConnection(filter: $filter) {
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
export const onUpdateConnection = /* GraphQL */ `
  subscription OnUpdateConnection(
    $filter: ModelSubscriptionConnectionFilterInput
  ) {
    onUpdateConnection(filter: $filter) {
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
export const onDeleteConnection = /* GraphQL */ `
  subscription OnDeleteConnection(
    $filter: ModelSubscriptionConnectionFilterInput
  ) {
    onDeleteConnection(filter: $filter) {
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
export const onCreateActivityOverview = /* GraphQL */ `
  subscription OnCreateActivityOverview(
    $filter: ModelSubscriptionActivityOverviewFilterInput
  ) {
    onCreateActivityOverview(filter: $filter) {
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
export const onUpdateActivityOverview = /* GraphQL */ `
  subscription OnUpdateActivityOverview(
    $filter: ModelSubscriptionActivityOverviewFilterInput
  ) {
    onUpdateActivityOverview(filter: $filter) {
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
export const onDeleteActivityOverview = /* GraphQL */ `
  subscription OnDeleteActivityOverview(
    $filter: ModelSubscriptionActivityOverviewFilterInput
  ) {
    onDeleteActivityOverview(filter: $filter) {
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
export const onCreateCords = /* GraphQL */ `
  subscription OnCreateCords($filter: ModelSubscriptionCordsFilterInput) {
    onCreateCords(filter: $filter) {
      latitude
      longitude
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCords = /* GraphQL */ `
  subscription OnUpdateCords($filter: ModelSubscriptionCordsFilterInput) {
    onUpdateCords(filter: $filter) {
      latitude
      longitude
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCords = /* GraphQL */ `
  subscription OnDeleteCords($filter: ModelSubscriptionCordsFilterInput) {
    onDeleteCords(filter: $filter) {
      latitude
      longitude
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlace = /* GraphQL */ `
  subscription OnCreatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onCreatePlace(filter: $filter) {
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
export const onUpdatePlace = /* GraphQL */ `
  subscription OnUpdatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onUpdatePlace(filter: $filter) {
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
export const onDeletePlace = /* GraphQL */ `
  subscription OnDeletePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onDeletePlace(filter: $filter) {
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
export const onCreateGeofenceSetting = /* GraphQL */ `
  subscription OnCreateGeofenceSetting(
    $filter: ModelSubscriptionGeofenceSettingFilterInput
  ) {
    onCreateGeofenceSetting(filter: $filter) {
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
export const onUpdateGeofenceSetting = /* GraphQL */ `
  subscription OnUpdateGeofenceSetting(
    $filter: ModelSubscriptionGeofenceSettingFilterInput
  ) {
    onUpdateGeofenceSetting(filter: $filter) {
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
export const onDeleteGeofenceSetting = /* GraphQL */ `
  subscription OnDeleteGeofenceSetting(
    $filter: ModelSubscriptionGeofenceSettingFilterInput
  ) {
    onDeleteGeofenceSetting(filter: $filter) {
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
export const onCreateParticipant = /* GraphQL */ `
  subscription OnCreateParticipant(
    $filter: ModelSubscriptionParticipantFilterInput
  ) {
    onCreateParticipant(filter: $filter) {
      OperationId
      UserId
      VehicleType
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateParticipant = /* GraphQL */ `
  subscription OnUpdateParticipant(
    $filter: ModelSubscriptionParticipantFilterInput
  ) {
    onUpdateParticipant(filter: $filter) {
      OperationId
      UserId
      VehicleType
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteParticipant = /* GraphQL */ `
  subscription OnDeleteParticipant(
    $filter: ModelSubscriptionParticipantFilterInput
  ) {
    onDeleteParticipant(filter: $filter) {
      OperationId
      UserId
      VehicleType
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOperation = /* GraphQL */ `
  subscription OnCreateOperation(
    $filter: ModelSubscriptionOperationFilterInput
  ) {
    onCreateOperation(filter: $filter) {
      id
      CreatorId
      OperationName
      Participants
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOperation = /* GraphQL */ `
  subscription OnUpdateOperation(
    $filter: ModelSubscriptionOperationFilterInput
  ) {
    onUpdateOperation(filter: $filter) {
      id
      CreatorId
      OperationName
      Participants
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOperation = /* GraphQL */ `
  subscription OnDeleteOperation(
    $filter: ModelSubscriptionOperationFilterInput
  ) {
    onDeleteOperation(filter: $filter) {
      id
      CreatorId
      OperationName
      Participants
      createdAt
      updatedAt
    }
  }
`;

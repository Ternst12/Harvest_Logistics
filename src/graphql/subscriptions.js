/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle {
    onCreateVehicle {
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
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle {
    onUpdateVehicle {
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
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle {
    onDeleteVehicle {
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
export const onCreateConnection = /* GraphQL */ `
  subscription OnCreateConnection {
    onCreateConnection {
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
export const onUpdateConnection = /* GraphQL */ `
  subscription OnUpdateConnection {
    onUpdateConnection {
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
export const onDeleteConnection = /* GraphQL */ `
  subscription OnDeleteConnection {
    onDeleteConnection {
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
export const onCreateActivityOverview = /* GraphQL */ `
  subscription OnCreateActivityOverview {
    onCreateActivityOverview {
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
export const onUpdateActivityOverview = /* GraphQL */ `
  subscription OnUpdateActivityOverview {
    onUpdateActivityOverview {
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
export const onDeleteActivityOverview = /* GraphQL */ `
  subscription OnDeleteActivityOverview {
    onDeleteActivityOverview {
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

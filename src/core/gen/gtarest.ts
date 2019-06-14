import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { InjectionToken, Inject, Provider } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

//============================ enums ============================

export enum AddedViaStatus {
  None = 0,
  Email = 1,
  Search = 2,
}

export enum AgentAssignmentType {
  Main = 0,
  Sub = 1,
  Temporary = 2,
}

export enum AgentDeskChannel {
  Default = 0,
  Email = 1,
  SMS = 2,
  Phone_Call = 3,
  Agent_Direct = 4,
  Traveller_Direct = 5,
  CNC = 6,
}

export enum AmexItineraryEmailStatus {
  EmailSent = 0,
  EmailNotSent = 1,
}

export enum AuthTypeEnum {
  None = 0,
  Booking = 1,
  CM = 2,
}

export enum BookingType {
  None = 0,
  FLT = 1,
  HLT = 2,
  Both = 3,
}

export enum Complexity {
  Unknown = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Bad = 4,
  Suspense = 5,
}

export enum Culture {
  US = 0,
  FR = 1,
  DE = 2,
  ES = 3,
}

export enum DashboardLabelStyleType {
  BsDefault = 0,
  BsPrimary = 1,
  BsInfo = 2,
  BsDanger = 3,
  BsSuccess = 4,
}

export enum DateTimeAction {
  Depart = 0,
  Arrive = 1,
  Checkin = 2,
  Checkout = 3,
}

export enum ExternalLoginSource {
  Facebook = 0,
}

export enum FlightRankingCategory {
  Price = 0,
  Stops = 1,
  Duration = 2,
  Class = 3,
  FareType = 4,
  Time = 5,
  Carrier = 6,
  Equipment = 7,
  Airport = 8,
  FlightConnection = 9,
  DepartureAirport = 10,
  ArrivalAirport = 11,
  CarrierFlightNumber = 12,
}

export enum FlightResponseItemType {
  Leg = 0,
  StopOver = 1,
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export enum GroupMemberStatus {
  Invited = 0,
  Accepted = 1,
  Rejected = 2,
}

export enum GTATokenType {
  NONE = 0,
  MESSAGE = 1,
  DONT_RESOLVE = 2,
  CHEAT_CODE = 3,
  TO = 4,
  FROM = 5,
  IN = 6,
  FOR = 7,
  VIA = 8,
  PAXNAME = 9,
  SPAXNAME = 10,
  TPAXNAME = 11,
  TSPAXNAME = 12,
  WPAXNAME = 13,
  RELATION = 14,
  RELATION_PLURAL = 15,
  PAX = 16,
  SOMEBODY = 17,
  SOMEBODY_PLURAL = 18,
  INFANT = 19,
  PERSON = 20,
  THEN = 21,
  MY = 22,
  ADDRESS = 23,
  INPAX = 24,
  ONPAX = 25,
  TCITY = 26,
  FCITY = 27,
  FTCITY = 28,
  INCITY = 29,
  ONCITY = 30,
  VIACITY = 31,
  CITY_TOKEN = 32,
  CITY_ALIAS_TOKEN = 33,
  POI = 34,
  WORDLIST = 35,
  GOOGLE_WORDLIST = 36,
  DURATION = 37,
  COUPLE_OF_DURATION = 38,
  ADD_STAY_DURATION = 39,
  DATEDURATION = 40,
  SERIAL_DURATION = 41,
  DATE = 42,
  SERIAL_DATE = 43,
  TIME_TOKEN = 44,
  TIME = 45,
  ARRIVE_DEPART_TIME = 46,
  SERIAL_TIME = 47,
  DATE_TIME = 48,
  SERIAL_DATE_TIME = 49,
  DATE_INTERVAL = 50,
  DATE_INTERVAL_CHRONIC = 51,
  TIME_INTERVAL = 52,
  TIMESLOT = 53,
  SERIAL_DATE_INTERVAL = 54,
  SERIAL_TIME_INTERVAL = 55,
  STAY = 56,
  HALF = 57,
  DATE_SHIFT = 58,
  WEEKNUMBER = 59,
  JOIN = 60,
  THROUGH = 61,
  DESTINATION_PROFILE = 62,
  ITIN = 63,
  CCM_MUST = 64,
  CCM_MUST_NOT = 65,
  CCM_ONLY = 66,
  CCM_POINTS = 67,
  PROFILE = 68,
  CURRENCY = 69,
  PRICE = 70,
  SERIAL_PRICE = 71,
  PRICE_RANGE = 72,
  SAME_FLIGHT = 73,
  SAME_HOTEL = 74,
  SAME_HOTEL_AS = 75,
  SHARE_ROOM = 76,
  SEPARATE_ROOM = 77,
  GENERAL_ATTRIBUTE = 78,
  HOTEL_ATTRIBUTE = 79,
  HOTEL_AMENITIES = 80,
  HOTEL_PRICE_CONSTRAINT = 81,
  ROOM_ATTRIBUTE = 82,
  HOTEL_NAME = 83,
  HOTEL_ADDRESS = 84,
  HOTEL_TYPE = 85,
  HOTELBRAND = 86,
  FLIGHT_ATTRIBUTE = 87,
  FLIGHT_CARRIER_NUMBER = 88,
  FLIGHT_TIME_CONSTRAINT = 89,
  FLIGHT_PRICE_CONSTRAINT = 90,
  FLIGHT = 91,
  RETURN = 92,
  SEE = 93,
  ONFLIGHT = 94,
  EQUIPMENT = 95,
  AIRLINE_TOKEN = 96,
  AIRLINE = 97,
  CABIN_CLASS = 98,
  CABIN_CLASS_KEYWORD = 99,
  FARE_CLASS = 100,
  FARE_PREFERENCE = 101,
  FLIGHT_STOPS = 102,
  FLIGHT_CONNECTIONS = 103,
  FLIGHT_TIME_PRIORITY = 104,
  FLIGHT_PRIORITY = 105,
  SEAT_TYPE = 106,
  ARRIVE_DEPART = 107,
  FLIGHT_TIME_PREF = 108,
  FLIGHT_DATE_PREF = 109,
  FLY = 110,
  NUMBER = 111,
  NEAR = 112,
  AT = 113,
  BEDTYPE = 114,
  SIZE = 115,
  BED = 116,
  STAR_RATING = 117,
  STAR = 118,
  RATING = 119,
  HOTEL = 120,
  DATESUFFIX = 121,
  AND = 122,
  COMPOSITE = 123,
  GARDEN = 124,
  OCEAN = 125,
  GOLF = 126,
  VIEW = 127,
  ROOM = 128,
  CITY = 129,
  BOUTIQUE = 130,
  POOL = 131,
  POOLVIEW = 132,
  SUITE = 133,
  SMOKING = 134,
  EXECUTIVE = 135,
  UPPER = 136,
  LOWER = 137,
  TOP = 138,
  FLOOR = 139,
  AS = 140,
  WATERFRONT = 141,
  AISLE = 142,
  WINDOW = 143,
  MIDDLE = 144,
  SEAT = 145,
  BUSINESS = 146,
  FIRST = 147,
  ECONOMY = 148,
  MAIN = 149,
  RESTRICTED = 150,
  UNRESTRICTED = 151,
  ROUNDTRIP = 152,
  BACK = 153,
  TICKET = 154,
  BOEING = 155,
  REGIONAL = 156,
  JET = 157,
  BOEING_MODEL = 158,
  AIRBUS = 159,
  AIRBUS_MODEL = 160,
  DEHAVILAND = 161,
  BOMBARDIER = 162,
  WIDE = 163,
  BODY = 164,
  NARROW = 165,
  AMBRAER = 166,
  EXIT = 167,
  ROW = 168,
  PRIORITY = 169,
  BOARDING = 170,
  EXTRA = 171,
  LEGROOM = 172,
  SHORTEST = 173,
  CONNECTION = 174,
  FEWEST = 175,
  ALLIANCE = 176,
  OR = 177,
  DIRECT = 178,
  NONSTOP = 179,
  STOP = 180,
  CLASS = 181,
  PREFERRED = 182,
  CABIN = 183,
  SELECT = 184,
  LOW = 185,
  PRICE_SENSITIVITY = 186,
  WITH = 187,
  EARLIEST = 188,
  LAST = 189,
  THING = 190,
  THERE = 191,
  SHOW = 192,
  BRING = 193,
  ALONG = 194,
  BIRTHDAY = 195,
  BIRTHDAY_WEEKEND = 196,
  ARRIVE = 197,
  AFTER = 198,
  BEFORE = 199,
  NEXT = 200,
  DEPART = 201,
  WEEKDAY = 202,
  YEAR = 203,
  DAY = 204,
  EVE = 205,
  HOLIDAY = 206,
  BETWEEN = 207,
  MONTH_TOKEN = 208,
  MONTH = 209,
  TODAY = 210,
  TOMORROW = 211,
  NOW = 212,
  COUPLE = 213,
  BY = 214,
  TIMEZONE = 215,
  AMPM = 216,
  WEEK = 217,
  FORTNIGHT = 218,
  WEEKEND = 219,
  BREAK = 220,
  THIS = 221,
  HOME = 222,
  MORE = 223,
  TOBEREMOVED = 224,
  ADD = 225,
  SHORTEN = 226,
  EXTEND = 227,
  CHANGE = 228,
  UPGRADE = 229,
  DOWNGRADE = 230,
  TRIP = 231,
  TTRIP = 232,
  FTRIP = 233,
  TPAX_TRIP = 234,
  REMOVE = 235,
  WHY = 236,
  HOW = 237,
  WHERE = 238,
  PREPONE = 239,
  POSTPONE = 240,
  INSTEAD = 241,
  INSTEAD_CITY = 242,
  DESTINATION = 243,
  TODATE = 244,
  REMOVE_CITY = 245,
  WANT = 246,
  LATERON = 247,
  ACCOMPANY = 248,
  NEGATION = 249,
  UNTIL = 250,
  AIRPORTNAME = 251,
  AIRPORTCODE = 252,
  COUNTRYNAME = 253,
  SMOKING_PREF = 254,
  PUBLIC_HOLIDAY = 255,
  CLUBBED_STARRATING = 256,
  SAME = 257,
  NOHOTEL = 258,
  NOFLIGHT = 259,
  EARLY = 260,
  LATE = 261,
  ONLY = 262,
  LET = 263,
  LOCATION_COORDINATES = 264,
  COORDS_FROM_MAP_SEARCH = 265,
  VALIDATE_HOTEL_OR_POI = 266,
  JOINEDDATE = 267,
  BEFORE_CITY = 268,
  CANDIDATE_WORD = 269,
  PROXIMITY = 270,
  RESERVATION = 271,
  AFTER_CITY = 272,
  FLIGHTON = 273,
  REMOVED = 274,
  ON = 275,
  PREFER = 276,
  DESTINATION_CATEGORY = 277,
  FOR_THE_DAY = 278,
  FOR_THE_NIGHT = 279,
  AS_WELL = 280,
  RESOLVED_BY_GOOGLE = 281,
  TO_BE_RESOLVED_BY_GOOGLE = 282,
  SAME_FLIGHT_AS = 283,
  JOIN_INCITY = 284,
  WEEKEND_DURATION = 285,
  PUBLIC_HOLIDAY_WEEKEND = 286,
  YES = 287,
  REPLACE_QUERY = 288,
  ALTERNATIVES = 289,
  ITINERARY = 290,
  COMPANION = 291,
  PREFERENCES = 292,
  RATES = 293,
  SPECIAL = 294,
  COUNTRY_ALIAS_TOKEN = 295,
  EXAMPLE = 296,
  TUTORIAL = 297,
  ANOTHER = 298,
  NEED = 299,
  NEEDHOTEL = 300,
  MINOR = 301,
  CHECK_IN_OUT = 302,
  COMPANION_GROUP = 303,
  PREDEFINED_DATE_DURATION = 304,
  PRICE_TOKEN = 305,
  RESOLVE_DATE = 306,
  AROUND = 307,
  IGNORED_TOKEN = 308,
  BOOK = 309,
  POISTRING = 310,
  BEDTYPE_CANDIDATE = 311,
}

export enum HighlightSearchType {
  City = 0,
  CityAlias = 1,
  DestinationCategory = 2,
  Name = 3,
  CountryName = 4,
  AirportName = 5,
  AirportCode = 6,
  Relation = 7,
  Removed = 8,
}

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultipleChoices = 300,
  Ambiguous = 300,
  MovedPermanently = 301,
  Moved = 301,
  Found = 302,
  Redirect = 302,
  SeeOther = 303,
  RedirectMethod = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  RedirectKeepVerb = 307,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestUriTooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  UpgradeRequired = 426,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
}

export enum ItineraryItemResponseType {
  hotel = 0,
  hotelroom = 1,
  flight = 2,
}

export enum ItineraryState {
  New_In_Progress = 0,
  Draft_Created = 1,
  Draft_Approved_Qa = 2,
  Solution_Approved_Agent = 3,
  Solution_Accepted = 4,
  Approval_Granted = 5,
  Booking_Success = 6,
  Confirmation_Sent = 7,
  Pending_Update = 50,
  Pending_User_Update = 51,
  Suspense_System_Error = 100,
  Suspense_No_Solution = 101,
  Suspense_Draft_Declined_Qa = 102,
  Suspense_Solution_Declined_Agent = 103,
  Suspense_Solution_Declined_Client = 104,
  Suspense_Approval_Declined = 105,
  Suspense_Booking_Fail = 106,
  Suspense_Ambiguous_Request = 150,
  Suspense_User_Not_Found = 151,
  Suspense_Missing_Info_Second_Pass_Fail = 201,
}

export enum JMeterUserType {
  QA = 0,
  Agent = 1,
  User = 2,
}

export enum LoadTestReportStatType {
  Number = 0,
  TimeSpan = 1,
}

export enum MarketingTravelerType {
  Business = 0,
  Leisure = 1,
  Both = 2,
}

export enum MessageId {
  ErrorActivateUser = 0,
  ErrorAirportNotFound = 100,
  ErrorBookedItineraryNotFound = 200,
  ErrorCancellingHotel = 300,
  ErrorCancellingPNR = 400,
  ErrorCannotCancelAlreadyCancelledFlight = 600,
  ErrorCannotCancelAlreadyCancelledHotel = 700,
  ErrorCannotCancelTestBooking = 800,
  ErrorCantRemovePreferredCardForPaidMembers = 900,
  ErrorCAPTCHAFailed = 1000,
  ErrorCardDetailsNeededForPaidMembers = 1100,
  ErrorCardNotSupportedForItem = 1150,
  ErrorCityStateCounrtyMatchNotFound = 1200,
  ErrorCompanionAlreadyAssociated = 1300,
  ErrorCompanionNotFound = 1400,
  ErrorCompanionRejectFailed = 1500,
  ErrorContentUnavailable = 1600,
  ErrorCountryNotFound = 1700,
  ErrorDuplicateEmailAddress = 1800,
  ErrorEmptyHighlightId = 1900,
  ErrorExternalAccountAlreadyLinked = 1950,
  ErrorFeePaymentProcessing = 2000,
  ErrorFlightNotBooked = 2200,
  ErrorFlightNotFoundInBookedSolution = 2300,
  ErrorFlightNotFoundInSolution = 2400,
  ErrorFlightTimeTooCloseToNow = 2500,
  ErrorFreeUsageMaxReached = 2600,
  ErrorGetAlternativeHotels = 2700,
  ErrorGetCreditCardDetails = 2900,
  ErrorGetCreditCardSessionToken = 3000,
  ErrorGetPromoHotels = 3100,
  ErrorGroupUserAlreadyInvited = 3400,
  ErrorGroupUserLimitReached = 3500,
  ErrorHotelAvailCheckFailed = 3600,
  ErrorHotelConflict = 3700,
  ErrorHotelNotBooked = 3800,
  ErrorHotelNotFoundInSolution = 3900,
  ErrorInactiveGroup = 4000,
  ErrorInsecureNotAllowed = 4100,
  ErrorUserRoleNotAuthorized = 4120,
  ErrorInvalidAccessToken = 4150,
  ErrorInvalidAge = 4200,
  ErrorInvalidAirlinePointsProgramId = 4300,
  ErrorInvalidAttributeId = 4400,
  ErrorInvalidCategoryCode = 4500,
  ErrorCannotAddSelfAsCompanion = 4550,
  ErrorInvalidConfirmationId = 4600,
  ErrorInvalidCorrelationQuoteId = 4700,
  ErrorInvalidCountryCode = 4800,
  ErrorInvalidCreditCard = 4900,
  ErrorInvalidEchoToken = 5000,
  ErrorInvalidEchoTokenAndQuoteId = 5100,
  ErrorInvalidEmail = 5200,
  ErrorInvalidFlightId = 5300,
  ErrorInvalidGroup = 5500,
  ErrorInvalidGroupInvite = 5600,
  ErrorInvalidGroupMember = 5700,
  ErrorInvalidHotelId = 5800,
  ErrorInvalidHotelRoomId = 5900,
  ErrorInvalidInputs = 6000,
  ErrorInvalidInvitation = 6100,
  ErrorInvalidItemToBook = 6200,
  ErrorInvalidItemToCheckout = 6300,
  ErrorInvalidLength = 6400,
  ErrorInvalidOccupant = 6500,
  ErrorInvalidPhoneNumber = 6600,
  ErrorInvalidPostalCode = 6700,
  ErrorInvalidProviderFlightBookingId = 6900,
  ErrorInValidProvinceAsPerLegal = 7000,
  ErrorInvalidQuery = 7100,
  ErrorInvalidTitle = 7200,
  ErrorInvalidTravelProfileId = 7250,
  ErrorInvalidUser = 7300,
  ErrorInvalidUserAirlinePointsProgramId = 7400,
  ErrorInvoicePaymentAlreadyVoided = 7450,
  ErrorItineraryIdNullOrDefault = 7500,
  ErrorItineraryNotFound = 7600,
  ErrorMaxRoomOccupancyExceeded = 7700,
  ErrorMissingCreditCard = 7800,
  ErrorMissingPaxDetail = 7900,
  ErrorMissingRequiredInput = 8000,
  ErrorNoAlternativeFlightsFoundForPassenger = 8100,
  ErrorNoEmailPermission = 8150,
  ErrorNoHotelsFoundInSolution = 8200,
  ErrorNoHotelsFoundNearby = 8300,
  ErrorNoItemRemainsInItinerary = 8400,
  ErrorNoItemSpecifiedForCheckout = 8500,
  ErrorNoPasswordOrAuthToken = 8550,
  ErrorNoProvincesFoundForCountry = 8600,
  ErrorNotGroupAdmin = 8700,
  ErrorNotStrongPassword = 8800,
  ErrorNoUserTravelPreferenceProfilesFound = 8900,
  ErrorPassengerNotFoundInSolution = 9000,
  ErrorPassengerNotRegisteredToRoom = 9100,
  ErrorPNRNotFound = 9200,
  ErrorProcessBooking = 9300,
  ErrorProcessFlightCancellation = 9400,
  ErrorProcessFlightExchange = 9500,
  ErrorProcessHotelBooking = 9600,
  ErrorProvinceNotFound = 9800,
  ErrorRetrievingHotelBookingDetails = 9900,
  ErrorSearchFlight = 10000,
  ErrorSearchHotel = 10100,
  ErrorTicketNotFound = 10200,
  ErrorTicketNotIssuedNorCancelled = 10300,
  ErrorUndoItinerary = 10500,
  ErrorUserActivationRequired = 10550,
  ErrorUserAlreadyActivated = 10600,
  ErrorUserAlreadyGroupMember = 10700,
  ErrorUserDeviceNotFound = 10800,
  ErrorUserHasNoAddress = 10900,
  ErrorUserMustBeAdultToAddCompanion = 10950,
  ErrorUserNotAllowedForCheckout = 11000,
  ErrorUserNotFound = 11100,
  ErrorUserPasswordMismatch = 11200,
  ErrorUserProfileNotCreated = 11300,
  ErrorVoidingTicket = 11600,
  FlightTicketReceived = 11800,
  InvalidUserTypeSetupContactHGB = 11900,
  PaymentAuthConsentNotGiven = 12000,
  TravelCompanionRequestReceived = 12100,
  TravelCompanionRequestAccepted = 12200,
  ErrorCannotChangeBookedItemWithoutCM = 12300,
  AlternativeNotFound = 12400,
  ErrorInvalidCompanionGroup = 12500,
  ErrorMaxCompanionReached = 12600,
  ErrorInvalidCompanions = 12700,
  ErrorGroupNameUsed = 12800,
  ErrorDuplicateGroup = 12900,
  ErrorBookingMissingPaxForMultiPaxItem = 13000,
  ErrorDatePassed = 13100,
  ErrorMaxFailedBookingReached = 13200,
  ErrorBookingPaxTypeMismatch = 13300,
  ErrorAlreadyImpersonatingUser = 13320,
  ViewItinerary = 13322,
  ItineraryReadyAgentReply = 13324,
  ResolutionLink = 13326,
  ErrorSms = 13328,
  BookedItinerary = 13330,
  SessionClosed = 13332,
  ReviewItinerary = 13334,
  MaxCompanionsInAGroup = 13336,
  FlightScheduleNotification = 14000,
  ErrorMessageExternalId = 20000,
  ErrorServiceNameNotFound = 21000,
  ErrorServiceSecretKeyMismatch = 21050,
  ErrorServiceInactive = 21100,
  ErrorRequestUserNotFound = 22000,
  ErrorInvalidAgencyUser = 22003,
  ErrorInvalidWorkspace = 22050,
  ErrorRequestAgentNotFound = 220001,
  ErrorInsufficientPermission = 230000,
  ErrorInvalidWorkflow = 300000,
}

export enum NaturalLanguage {
  en = 0,
  fr = 1,
  de = 2,
  es = 3,
}

export enum NetworkResolutionType {
  Date = 0,
  Time = 1,
  DateTime = 2,
  None = 3,
}

export enum NodeType {
  none = 0,
  dummy = 1,
  flight = 2,
  tour = 3,
  location = 4,
  city = 5,
  hotel = 6,
  car = 7,
  restaurant = 8,
  activity = 9,
  preferences = 10,
  instruction = 11,
}

export enum Participant {
  User = 0,
  Parser = 1,
  Scheduler = 2,
}

export enum PaxStatus {
  Null = 0,
  Organizer = 1,
  Pending = 2,
  Companion = 3,
}

export enum PaxType {
  ADT = 0,
  CNN = 1,
  INF = 2,
}

export enum PaymentCardType {
  AX = 1,
  MC = 3,
  VI = 4,
}

export enum PaymentStateCode {
  UNPAID = 0,
  PAID = 1,
  PROCESSING = 2,
  CANCELLED = 3,
  TICKETED = 4,
  EXCHANGED = 5,
  FAILED = 6,
  BOOKING = 7,
}

export enum PhraseAction1 {
  NONE = 0,
  FLIGHT = 1,
  HOTEL = 2,
  HOTEL_CONDITIONAL = 3,
  HOTEL_IFF = 4,
  FLIGHTNHOTEL = 5,
  CAR = 6,
  JOIN = 7,
  PROFILE = 8,
  RETURN = 9,
  UPDATE_FLIGHT_GLOBAL = 10,
  RETURN_FLIGHT = 11,
  TCITY = 12,
  FOR_TCITY = 13,
  FCITY = 14,
  VIACITY = 15,
  INCITY = 16,
  ONFLIGHT = 17,
  ONCITY = 18,
  DATE = 19,
  DATEINTERVAL = 20,
  DATEINTERVALC = 21,
  DONT_RESOLVE_DATE_INTERVAL = 22,
  DONT_RESOLVE_DATE = 23,
  DONT_RESOLVE_DATE_ON = 24,
  TIME = 25,
  TIMEINTERVAL = 26,
  TIMEINTERVALSLOT = 27,
  HOTEL_PRICE_SENSITIVITY = 28,
  ROOM_TYPE = 29,
  SMOKINGPREF = 30,
  NEEDHOTEL = 31,
  ROOMTYPE = 32,
  BEDSIZE = 33,
  BEDTYPE = 34,
  HOTELBRAND = 35,
  STARRATING = 36,
  HOTELNAME = 37,
  DURATION = 38,
  COUPLE_OF_DURATION = 39,
  DATEDURATION = 40,
  ROOM_VIEW = 41,
  POOL = 42,
  HOTEL_TYPE = 43,
  FLIGHT_SEAT = 44,
  FARE_CLASS = 45,
  FLIGHT_PRIORITY = 46,
  FLIGHT_TIME_PRIORITY = 47,
  FLIGHT_STOPS = 48,
  FLIGHT_NUMSTOPS = 49,
  FLIGHT_TIME_SENSITIVITY = 50,
  FLIGHT_PRICE_SENSITIVITY = 51,
  FLIGHT_CONNECTIONS = 52,
  FLIGHT_CARRIER_NUMBER = 53,
  CABIN_CLASS = 54,
  MAKE_CARRIER = 55,
  MAKE_CARRIER_FROM_CT = 56,
  UPDATE_FLIGHT = 57,
  UPDATE_HOTEL = 58,
  FTCITY = 59,
  TPAX = 60,
  TSPAX = 61,
  WPAX = 62,
  SPAXNAME = 63,
  ARRIVE_INCITY = 64,
  ADD_DURATION = 65,
  NEGATE = 66,
  DEPART_ARRIVE = 67,
  MAKE_DURATION_FROM_UNTIL = 68,
  HANDLE_RATING = 69,
  SAMEFLIGHT = 70,
  SAMEHOTEL_AS_PAX = 71,
  NOHOTEL = 72,
  NOFLIGHT = 73,
  MAKE_SPAX = 74,
  REMOVE_RETURN_FLIGHT = 75,
  CHANGE_FLIGHT_HOTEL_DATE = 76,
  MAKE_DATE_TIMESLOT = 77,
  MAKE_TIMESLOT = 78,
  REMOVE_LET = 79,
  HANDLE_MY = 80,
  HANDLE_RELATION = 81,
  EXTRACT_DATE = 82,
  MSG_SPECIFY_DURATION = 83,
  MSG_INCOMPLETE_TIME_INTERVAL = 84,
  MSG_INCOMPLETE_DATE_INTERVAL = 85,
  RESOLVE_PUBLIC_HOLIDAY = 86,
  RESOLVE_PUBLIC_HOLIDAY_EVE = 87,
  TCITYDURATION = 88,
  FCITYMENTION = 89,
  AIRPORT_TCITY = 90,
  AIRPORT_FCITY = 91,
  AIRPORT_INCITY = 92,
  AIRPORTCODE_TCITY = 93,
  AIRPORTCODE_FCITY = 94,
  AIRPORTCODE_INCITY = 95,
  TTRIP = 96,
  FTRIP = 97,
  TPAX_TRIP = 98,
  REMOVE_PAX_FTRIP = 99,
  ADD_PAX_TRIP = 100,
  ADD_PAX_TPAX_TRIP = 101,
  SHORTEN_DURATION = 102,
  ADD_PAX_TO_FLIGHT = 103,
  WITHPAX_ITINERARY = 104,
  CHANGE_TO_DATE = 105,
  CHANGE_CHECK_IN_OUT_DATE = 106,
  CHANGE_ARRIVAL_DATE = 107,
  CHANGE_DEPARTURE_DATE = 108,
  CHANGE_TRIP_DURATION = 109,
  CHANGE_TRIP_INTERVAL = 110,
  PREPONE_TRIP = 111,
  POSTPONE_TRIP = 112,
  PREPONE_TRIP_DURATION = 113,
  POSTPONE_TRIP_DURATION = 114,
  CHANGE_PAX_TCITY = 115,
  QUESTION_TREE_REDIRECT = 116,
  REMOVE_FLIGHT = 117,
  REMOVE_FLIGHT_ADD_FLIGHT = 118,
  REMOVE_HOTEL = 119,
  REMOVE_HOTEL_RESCHEDULE = 120,
  DELETE_HOTEL_UPDATE_ITIN = 121,
  REMOVE_CITY = 122,
  REMOVE_CITY_FTRIP = 123,
  CHANGE_CITY_WITH_CITY = 124,
  TCITY_FLIGHT = 125,
  INSTEAD_CITY = 126,
  SHOW_FLIGHT = 127,
  SHOW_HOTEL = 128,
  FLIGHTLASTCITY = 129,
  GOOGLE_STAY_IN = 130,
  GOOGLE_STAY_IN_CITY = 131,
  GOOGLE_STAY_NEAR = 132,
  GOOGLE_HOTEL_IN_CITY_TO = 133,
  GOOGLE_FLY_TO = 134,
  GOOGLE_FLY_FROM = 135,
  BEFORE_CITY = 136,
  BEFORE_CITY_TCITY = 137,
  BEFORE_HOME_CITY = 138,
  AFTER_CITY = 139,
  AFTER_CITY_TCITY = 140,
  REMOVE_CHANGE_CITY_WITH_CITY = 141,
  MAKE_FLIGHT_TOKEN = 142,
  CHANGE_FCITY_WITH_TCITY = 143,
  CHANGE_CITY_WITH_CITY_REPHRASE = 144,
  CHANGE_DEPARTURE_CITY = 145,
  CHANGE_FCITY_TCITY = 146,
  MAKE_HOME_TCITY = 147,
  REMOVE_DURATION = 148,
  CHANGE_RETURN_FLIGHT_DATE = 149,
  CLARIFY_HOTEL_UPGRADE = 150,
  UPGRADE_HOTEL_RATING = 151,
  CHANGE_RETURN_CITY = 152,
  AS_WELL = 153,
  MAKE_WORDLIST = 154,
  CHANGE_RETURN_DURATION = 155,
  SELECT_NEXT_PAXNAME = 156,
  SAMEFLIGHT_AS_PAX = 157,
  MAKE_JOIN_PAX_IN_CITY = 158,
  MAKE_JOIN_TOKEN = 159,
  MAKE_BIRTHDAY = 160,
  MAKE_WEEKEND_DURATION = 161,
  CHANGE_FTCITY_WITH_FTCITY_REPHRASE = 162,
  ANSWER_YES = 163,
  ANSWER_NO = 164,
  QUESTION_HOTEL_SELECTION = 165,
  QUESTION_HOW_ALTERNATIVES = 166,
  QUESTION_WHERE_ETICKET = 167,
  QUESTION_HOW_ITINERARY = 168,
  QUESTION_HOW_COMPANION = 169,
  QUESTION_HOW_PREFERENCES = 170,
  CHANGE_CABIN_CLASS = 171,
  QUESTION_WHERE_SPECIAL_RATES = 172,
  DATEINTERVALC_INMONTH = 173,
  REMOVE_STOP = 174,
  DEPART_ARRIVE_CITY = 175,
  CHOOSE_EXACT_DATE = 176,
  ARRIVE_DEPART_TIME = 177,
  AROUNDTIME = 178,
}

export enum PhraseAction2 {
  NONE = 0,
  DUMMY_ACTION2_1 = 1,
  DUMMY_ACTION2_2 = 2,
  UPDATE_FLIGHT = 3,
  NO_TCITY = 4,
  JOIN_WHOM = 5,
}

export enum PhraseType {
  DEFAULT = 0,
  RETURN = 1,
  RETURNONLY = 2,
  RETURNTOCITY = 3,
  RETURNFROMCITY = 4,
  FLIGHT_FOR_HOTEL_CONDITIONALLY = 5,
  JOIN_PAX = 6,
  EXTEND_HOTEL = 7,
  FLIGHT_LAST_CONTEXT = 8,
}

export enum Platform {
  Web = 0,
  iOS = 1,
}

export enum PolicyRuleOperatorEnum {
  equal_to = 0,
  different_than = 1,
  between = 2,
}

export enum PreScanReviewChunkType {
  Unknown = 0,
  Place = 1,
  Date = 2,
  Time = 3,
  FlightAttr = 4,
  HotelAttr = 5,
  Other = 6,
}

export enum ProcessedByEnum {
  Wern1 = 0,
  Wern2 = 1,
  WernHtml = 2,
}

export enum ProcessingPass {
  GeneralPass = 0,
  UnhandledPhrasePass = 1,
  GlobalAttributesPass = 2,
  SpecificAttributesPass = 3,
}

export enum QuerySource {
  Hgb = 0,
  Amex = 1,
}

export enum RankerType {
  Flight = 0,
  Hotel = 1,
}

export enum RelativityIdentifier {
  None = 0,
  Exact = 1,
  Before = 2,
  After = 3,
}

export enum ReportSegment {
  New = 0,
  Draft = 1,
  AgentReview = 2,
  ClientReview = 3,
  Booked = 4,
  Suspense = 5,
}

export enum ReviewStatusEnum {
  Pass = 0,
  PartialPass = 1,
  Failed = 2,
}

export enum RoleType {
  HgbAdmin = 1,
  HgbQaAdmin = 20,
  HgbQaAgent = 50,
  AgencyAdmin = 100,
  AgencyBranchAdmin = 150,
  Agent = 175,
  ClientAdministrator = 200,
  ClientTraveller = 250,
  LeisureTraveller = 500,
}

export enum SearchType {
  Name = 0,
  Email = 1,
}

export enum ServiceNameType {
  Api = 0,
  Parser = 1,
  Scheduler = 2,
  Content = 3,
  Ranking = 4,
}

export enum Status {
  Rejected = 0,
  Pending = 1,
  Accepted = 2,
  Guest = 3,
  None = 4,
}

export enum TestBatch {
  Default = 0,
  JonsAnalysis = 1,
  SplitNew = 2,
  _516_Batch = 3,
  GBTbatch1_0629 = 4,
  GBT_Batch1_0710 = 5,
  GBT_Batch2_0719 = 6,
  Answered = 7,
  RoysBatch1 = 8,
  DashboardTest = 100,
}

export enum TokenizationLogMessageType {
  None = 0,
  ListOfGTAToken = 1,
  ListOfMPPTreeNodeToken = 2,
  StringEntry = 3,
}

export enum TransactionState {
  New = 0,
  Resolving = 1,
  Ready = 2,
  Locked = 3,
  Suspense = 4,
  Closed = 5,
  Call_Waiting = 6,
  Call_Answered = 7,
  Sms_Pending = 8,
  Ignored = 9,
}

export enum UserTypeEnum {
  NPAY = 0,
  PAYU = 1,
  GADM = 2,
  GMBR = 3,
}

export enum Vendor {
  Unknown = 0,
  EX = 1,
  CZ = 2,
  BC = 3,
  PL = 4,
  TP = 5,
  FN = 6,
  UAPI = 7,
  SB = 8,
}

export enum WernickeAnswerType {
  Default = 0,
  Wern = 1,
  WernPost = 2,
  Network = 3,
  Transformation = 4,
}

export enum WernickeVersionEnum {
  Wern1 = 0,
  Wern2 = 1,
  WernHTML = 2,
}

//============================ classes ============================

/**
 * Source class: GTA.Common.Models.MasterData.Action
 */
export class Action {
  actionid: number;
  addeddatetime: Date;
  description: string;
  method: string;
  modifieddatetime: Date;
  path: string;

  constructor(init?: Partial<Action>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.AddressType
 */
export class AddressType {
  addrtypcd: string;
  addrtype: string;
  addrtypedesc: string;

  constructor(init?: Partial<AddressType>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.MasterData.AddressTypeDTO
 */
export class AddressTypeDTO {
  addrtypcd: string;
  addrtype: string;
  addrtypedesc: string;

  constructor(init?: Partial<AddressTypeDTO>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.AddUserProfileRequest
 */
export class AddUserProfileRequest {
  accepthgbmarketing: boolean;
  acceptthirdpartymarketing: boolean;
  address: string;
  carddetail: CardToken;
  city: string;
  country: string;
  externalloginsource?: ExternalLoginSource;
  externallogintoken: string;
  firstname: string;
  gender: Gender;
  isprofilepublic: boolean;
  lastname: string;
  marketingtravelertype?: MarketingTravelerType;
  middlename: string;
  password: string;
  postalcode: string;
  state: string;
  token: string;
  username: string;
  usertypeid: UserTypeEnum;

  constructor(init?: Partial<AddUserProfileRequest>) {
    Object.assign(this, init, {
      carddetail: init.carddetail ? new CardToken(init.carddetail) : null,
      externalloginsource: isNaN(init.externalloginsource) ? ExternalLoginSource[init.externalloginsource] : init.externalloginsource,
      gender: isNaN(init.gender) ? Gender[init.gender] : init.gender,
      marketingtravelertype: isNaN(init.marketingtravelertype) ? MarketingTravelerType[init.marketingtravelertype] : init.marketingtravelertype,
      usertypeid: isNaN(init.usertypeid) ? UserTypeEnum[init.usertypeid] : init.usertypeid,
    });
  }
}

/**
 * Source class: GTA.Common.Models.AgentDesk.Agency
 */
export class Agency {
  account: AgencyAccount[];
  addeddatetime: Date;
  agencycode: string;
  modifieddatetime: Date;
  name: string;
  policy: OldPolicy;
  policyid: number;

  constructor(init?: Partial<Agency>) {
    Object.assign(this, init, {
      account: _.map(init.account, x => x ? new AgencyAccount(x) : null),
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      policy: init.policy ? new OldPolicy(init.policy) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.AgentDesk.AgencyAccount
 */
export class AgencyAccount {
  addeddatetime: Date;
  addressline: string;
  agencycode: string;
  cityname: string;
  countrycode: string;
  currency: string;
  modifieddatetime: Date;
  pcc: string;
  postalcode: string;
  provider: string;
  statecode: string;
  streetnumber: string;

  constructor(init?: Partial<AgencyAccount>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.AgencyDto
 */
export class AgencyDto {
  agencycode: string;
  name: string;

  constructor(init?: Partial<AgencyDto>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.AgentDesk.AgentDeskAgentReport
 */
export class AgentDeskAgentReport {
  averagetime: string;
  profileid: string;
  runningtotalcount: number;
  runningtotaltimeticks: number;

  constructor(init?: Partial<AgentDeskAgentReport>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Email.AgentDeskEmailRequest
 */
export class AgentDeskEmailRequest {
  batch: TestBatch;
  body: string;
  complexity: Complexity;
  from: string;
  messageid: string;
  references: string;
  replyemail: string;
  reviewreq: boolean;
  source: QuerySource;
  subject: string;
  threadid: string;
  to: string;
  uid: string;

  constructor(init?: Partial<AgentDeskEmailRequest>) {
    Object.assign(this, init, {
      batch: isNaN(init.batch) ? TestBatch[init.batch] : init.batch,
      complexity: isNaN(init.complexity) ? Complexity[init.complexity] : init.complexity,
      source: isNaN(init.source) ? QuerySource[init.source] : init.source,
    });
  }
}

/**
 * Source class: GTA.Common.Models.AgentDesk.AgentDeskReport
 */
export class AgentDeskReport {
  agenttimes: { [id: string]: AgentDeskAgentReport; };
  averagetime: string;
  count: number;
  label: string;
  runningtotalcount: number;
  runningtotaltimeticks: number;
  segmenttype: ReportSegment;

  constructor(init?: Partial<AgentDeskReport>) {
    Object.assign(this, init, {
      agenttimes: _.mapValues(init.agenttimes, x => x ? new AgentDeskAgentReport(x) : null),
      segmenttype: isNaN(init.segmenttype) ? ReportSegment[init.segmenttype] : init.segmenttype,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AgentDesk.Request.AgentDeskWebStaticRequest
 */
export class AgentDeskWebStaticRequest {
  itineraryid: string;
  query: string;

  constructor(init?: Partial<AgentDeskWebStaticRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.MasterData.AirEquipmentDTO
 */
export class AirEquipmentDTO {
  equipmentcode: string;
  equipmentname: string;

  constructor(init?: Partial<AirEquipmentDTO>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.AirlinePointsProgram
 */
export class AirlinePointsProgram {
  addeddatetime: Date;
  id: number;
  modifieddatetime: Date;
  programname: string;

  constructor(init?: Partial<AirlinePointsProgram>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AirlinePointsProgram.AirlinePointsProgramRequest
 */
export class AirlinePointsProgramRequest {
  id?: number;
  programid: number;
  programnumber: string;

  constructor(init?: Partial<AirlinePointsProgramRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AirlinePointsProgram.AirlinePointsProgramResponse
 */
export class AirlinePointsProgramResponse {
  id: number;
  programid: number;
  programname: string;
  programnumber: string;
  userprofileid: string;

  constructor(init?: Partial<AirlinePointsProgramResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.AirportInfo
 */
export class AirportInfo {
  cities: CityAirportInfo[];
  country: string;
  ishighlighted: boolean;

  constructor(init?: Partial<AirportInfo>) {
    Object.assign(this, init, {
      cities: _.map(init.cities, x => x ? new CityAirportInfo(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Travel.AislePositioning
 */
export class AislePositioning {
  aislenbr: number;
  aisleposition: number;

  constructor(init?: Partial<AislePositioning>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.AmexItineraryStatusRequest
 */
export class AmexItineraryStatusRequest {
  id: string;
  status: AmexItineraryEmailStatus;

  constructor(init?: Partial<AmexItineraryStatusRequest>) {
    Object.assign(this, init, {
      status: isNaN(init.status) ? AmexItineraryEmailStatus[init.status] : init.status,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.AmexSearchRequest
 */
export class AmexSearchRequest {
  from: string;
  query: string;
  reviewreq: boolean;
  source: QuerySource;

  constructor(init?: Partial<AmexSearchRequest>) {
    Object.assign(this, init, {
      source: isNaN(init.source) ? QuerySource[init.source] : init.source,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.AnonymousToRegularRequest
 */
export class AnonymousToRegularRequest extends AddUserProfileRequest {
  userprofileid: string;

  constructor(init?: Partial<AnonymousToRegularRequest>) {
    super(init);
    Object.assign(this, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.AssignAgentToWorkspaceRequest
 */
export class AssignAgentToWorkspaceRequest {
  agentid: string;
  assignmenttype: AgentAssignmentType;
  workspaceid: number;

  constructor(init?: Partial<AssignAgentToWorkspaceRequest>) {
    Object.assign(this, init, {
      assignmenttype: isNaN(init.assignmenttype) ? AgentAssignmentType[init.assignmenttype] : init.assignmenttype,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.AssignClientToWorkspaceRequest
 */
export class AssignClientToWorkspaceRequest {
  clientid: string;
  workspaceid: number;

  constructor(init?: Partial<AssignClientToWorkspaceRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Admin.AssignRoleToUserRequest
 */
export class AssignRoleToUserRequest {
  agencycode: string;
  role: RoleType;
  userid: string;

  constructor(init?: Partial<AssignRoleToUserRequest>) {
    Object.assign(this, init, {
      role: isNaN(init.role) ? RoleType[init.role] : init.role,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Booking.BillingAddress
 */
export class BillingAddress {
  address: string;
  city: string;
  country: string;
  postalcode: string;
  province: string;
  suite_apt: string;

  constructor(init?: Partial<BillingAddress>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BillingDetail
 */
export class BillingDetail {
  address: string;
  city: string;
  contactname: string;
  country: string;
  email: string;
  telephone: string;

  constructor(init?: Partial<BillingDetail>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BookedFlight
 */
export class BookedFlight {
  confirmation: BookingConfirmation;
  eticket: FlightETicketResponse;
  itemguid: string;

  constructor(init?: Partial<BookedFlight>) {
    Object.assign(this, init, {
      confirmation: init.confirmation ? new BookingConfirmation(init.confirmation) : null,
      eticket: init.eticket ? new FlightETicketResponse(init.eticket) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BookedHotel
 */
export class BookedHotel {
  confirmation: BookingConfirmation;
  itemguid: string;

  constructor(init?: Partial<BookedHotel>) {
    Object.assign(this, init, {
      confirmation: init.confirmation ? new BookingConfirmation(init.confirmation) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BookedItineraryResponse
 */
export class BookedItineraryResponse {
  billingdetails: { [id: string]: BillingDetail; };
  bookedflights: BookedFlight[];
  bookedhotels: BookedHotel[];
  items: { [id: string]: IItineraryItemResponse; };
  itineraryid: string;

  constructor(init?: Partial<BookedItineraryResponse>) {
    Object.assign(this, init, {
      billingdetails: _.mapValues(init.billingdetails, x => x ? new BillingDetail(x) : null),
      bookedflights: _.map(init.bookedflights, x => x ? new BookedFlight(x) : null),
      bookedhotels: _.map(init.bookedhotels, x => x ? new BookedHotel(x) : null),
      items: _.mapValues(init.items, x => x ? new IItineraryItemResponse(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BookingConfirmation
 */
export class BookingConfirmation {
  billingdetails: string;
  changeandcancellation: ChangeAndCancellation;
  confirmationnumber: string;
  passengers: BookingPassengerItineraryResponse[];
  paymentcard: string;
  pricing: BookingPricing;

  constructor(init?: Partial<BookingConfirmation>) {
    Object.assign(this, init, {
      changeandcancellation: init.changeandcancellation ? new ChangeAndCancellation(init.changeandcancellation) : null,
      passengers: _.map(init.passengers, x => x ? new BookingPassengerItineraryResponse(x) : null),
      pricing: init.pricing ? new BookingPricing(init.pricing) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.BookingInputParameters
 */
export class BookingInputParameters {
  itemids: string[];
  itineraryid: string;

  constructor(init?: Partial<BookingInputParameters>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.StaticsController+BookingOptions
 */
export class BookingOptions {
  cardtypes: { [id: number]: string; };
  countries: CountryDTO[];
  titles: string[];
  underagedtitles: string[];

  constructor(init?: Partial<BookingOptions>) {
    Object.assign(this, init, {
      countries: _.map(init.countries, x => x ? new CountryDTO(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Travel.BookingPassenger
 */
export class BookingPassenger {
  addeddatetime: Date;
  address1: string;
  address2: string;
  address3: string;
  bookingid: string;
  bookingpassengerid: number;
  bookingtype: BookingType;
  city: string;
  country: string;
  dob: Date;
  emailaddress: string;
  firstname: string;
  fnseatpref: string;
  frequentflyernumber: string;
  gender: Gender;
  isregistered: boolean;
  lastname: string;
  mealpreference: string;
  middlename: string;
  modifieddatetime: Date;
  passengertypcd: string;
  passportdateofexpiry?: Date;
  passportdateofissue?: Date;
  paxid: string;
  paxmileage?: number;
  phone: string;
  pointsprogramid: number;
  pointsprogramnumber: string;
  postalcode: string;
  secondaryphone: string;
  specialrequest: string;
  state: string;
  title: string;

  constructor(init?: Partial<BookingPassenger>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      bookingtype: isNaN(init.bookingtype) ? BookingType[init.bookingtype] : init.bookingtype,
      dob: init.dob ? new Date(init.dob) : null,
      gender: isNaN(init.gender) ? Gender[init.gender] : init.gender,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      passportdateofexpiry: init.passportdateofexpiry ? new Date(init.passportdateofexpiry) : null,
      passportdateofissue: init.passportdateofissue ? new Date(init.passportdateofissue) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BookingPassenger
 */
export class BookingPassengerItineraryResponse {
  frequentflyernumber: string;
  frequentflyerprogram: string;
  name: string;

  constructor(init?: Partial<BookingPassengerItineraryResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BookingPricing
 */
export class BookingPricing {
  basefare: number;
  currency: string;
  taxes: number;
  totalfare: number;

  constructor(init?: Partial<BookingPricing>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.BookingRequest
 */
export class BookingRequest {
  bookingitems: { [id: string]: string[]; };
  carddetails: CardDetail[];
  feeconsents?: { [id: string]: boolean; };
  itineraryid: string;
  paxdetails: PaxDetails[];

  constructor(init?: Partial<BookingRequest>) {
    Object.assign(this, init, {
      carddetails: _.map(init.carddetails, x => x ? new CardDetail(x) : null),
      paxdetails: _.map(init.paxdetails, x => x ? new PaxDetails(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Change.CancellationResponse
 */
export class CancellationResponse {
  errorids: number[];
  errormessages: string[];
  estimatedrefund: number;
  issuccessful: boolean;
  itemid: string;
  itineraryid: string;
  paidstatustimestamp?: Date;
  penalty: number;

  constructor(init?: Partial<CancellationResponse>) {
    Object.assign(this, init, {
      paidstatustimestamp: init.paidstatustimestamp ? new Date(init.paidstatustimestamp) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Booking.CardDetail
 */
export class CardDetail {
  billingaddress: BillingAddress;
  cardnumber: string;
  cardtype: PaymentCardType;
  cvv: string;
  expirymonth: string;
  expiryyear: string;
  firstname: string;
  lastname: string;

  constructor(init?: Partial<CardDetail>) {
    Object.assign(this, init, {
      billingaddress: init.billingaddress ? new BillingAddress(init.billingaddress) : null,
      cardtype: isNaN(init.cardtype) ? PaymentCardType[init.cardtype] : init.cardtype,
    });
  }
}

/**
 * Source class: GTA.Common.Models.CardStorage.CardToken
 */
export class CardToken {
  addeddatetime: Date;
  billingcity: string;
  billingcountry: string;
  billingprovince: string;
  billingsuite: string;
  cardtype: PaymentCardType;
  isprefered: boolean;
  last4: string;
  modifieddatetime: Date;
  nickname: string;
  token: string;
  userid: string;

  constructor(init?: Partial<CardToken>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      cardtype: isNaN(init.cardtype) ? PaymentCardType[init.cardtype] : init.cardtype,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.CardStorage.CardTokenDetails
 */
export class CardTokenDetails extends CardToken {
  buyeraddress: string;
  buyerfirstname: string;
  buyerlastname: string;
  buyerzip: string;
  cardtypeid: string;
  expmonth: string;
  expyear: string;

  constructor(init?: Partial<CardTokenDetails>) {
    super(init);
    Object.assign(this, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.ChangeAndCancellation
 */
export class ChangeAndCancellation {
  minimumchangefee: number;

  constructor(init?: Partial<ChangeAndCancellation>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.ChangePasswordRequest
 */
export class ChangePasswordRequest {
  password: string;
  previouspassword: string;

  constructor(init?: Partial<ChangePasswordRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.CardStorage.ChangePreferedCard
 */
export class ChangePreferedCard {
  currenttoken: string;

  constructor(init?: Partial<ChangePreferedCard>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.CityAirport
 */
export class CityAirport {
  airportcode: string;
  airportnames: string[];
  isdefault: boolean;

  constructor(init?: Partial<CityAirport>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.CityAirportInfo
 */
export class CityAirportInfo {
  airports: CityAirport[];
  city: string;
  citycode: string;

  constructor(init?: Partial<CityAirportInfo>) {
    Object.assign(this, init, {
      airports: _.map(init.airports, x => x ? new CityAirport(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.MasterData.CityInfoDTO
 */
export class CityInfoDTO {
  latitude: number;
  longitude: number;

  constructor(init?: Partial<CityInfoDTO>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.CNCRequest
 */
export class CNCRequest {
  clientconnectionid: string;
  complexity: Complexity;
  goroomintersect: number;
  itineraryid: string;
  latitude?: number;
  longitude?: number;
  prescanresponse: PreScanResponse;
  query: string;
  token: HighlightCell_of_HighlightPositionAndValue[];
  travelpreferenceprofileid?: string;

  constructor(init?: Partial<CNCRequest>) {
    Object.assign(this, init, {
      complexity: isNaN(init.complexity) ? Complexity[init.complexity] : init.complexity,
      prescanresponse: init.prescanresponse ? new PreScanResponse(init.prescanresponse) : null,
      token: _.map(init.token, x => x ? new HighlightCell_of_HighlightPositionAndValue(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.CompanionGroup
 */
export class CompanionGroup {
  addeddatetime: Date;
  companiongroupid: number;
  companions: CompanionGroupCompanion[];
  modifieddatetime: Date;
  name: string;
  userprofileid: string;

  constructor(init?: Partial<CompanionGroup>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      companions: _.map(init.companions, x => x ? new CompanionGroupCompanion(x) : null),
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.CompanionGroupCompanion
 */
export class CompanionGroupCompanion {
  addeddatetime: Date;
  companiongroupid: number;
  companionid: string;
  modifieddatetime: Date;

  constructor(init?: Partial<CompanionGroupCompanion>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.CompanionRelationshipSynonym
 */
export class CompanionRelationshipSynonym {
  addeddatetime: Date;
  id: number;
  modifieddatetime: Date;
  relationshiptypeid: number;
  synonym: string;

  constructor(init?: Partial<CompanionRelationshipSynonym>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.CompanionRelationshipType
 */
export class CompanionRelationshipType {
  addeddatetime: Date;
  description: string;
  id: number;
  isfamilymember: boolean;
  modifieddatetime: Date;
  synonyms: CompanionRelationshipSynonym[];

  constructor(init?: Partial<CompanionRelationshipType>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      synonyms: _.map(init.synonyms, x => x ? new CompanionRelationshipSynonym(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Companions.CompanionRequest
 */
export class CompanionRequest {
  addedviastatus: AddedViaStatus;
  companionid: string;
  isadult: boolean;
  relationshiptypeid: number;
  stubcompanion: StubUserProfile;

  constructor(init?: Partial<CompanionRequest>) {
    Object.assign(this, init, {
      addedviastatus: isNaN(init.addedviastatus) ? AddedViaStatus[init.addedviastatus] : init.addedviastatus,
      stubcompanion: init.stubcompanion ? new StubUserProfile(init.stubcompanion) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Companions.CompanionResponse
 */
export class CompanionResponse {
  addeddatetime: Date;
  addedvia: AddedViaStatus;
  avatarurl: string;
  companionid: string;
  companionuserprofile: UserProfileResponse;
  confirmationstatus: Status;
  emailaddress: string;
  errorids: number[];
  errormessages: string[];
  invitationtoken?: string;
  invitoruserprofile: UserProfileResponse;
  isfamilymember: boolean;
  issuccessful: boolean;
  relationshiptype: string;
  relationshiptypeid?: number;

  constructor(init?: Partial<CompanionResponse>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      addedvia: isNaN(init.addedvia) ? AddedViaStatus[init.addedvia] : init.addedvia,
      companionuserprofile: init.companionuserprofile ? new UserProfileResponse(init.companionuserprofile) : null,
      confirmationstatus: isNaN(init.confirmationstatus) ? Status[init.confirmationstatus] : init.confirmationstatus,
      invitoruserprofile: init.invitoruserprofile ? new UserProfileResponse(init.invitoruserprofile) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Companions.CompanionSearchResponse
 */
export class CompanionSearchResponse {
  companions: CompanionResponse[];
  searchtype: SearchType;

  constructor(init?: Partial<CompanionSearchResponse>) {
    Object.assign(this, init, {
      companions: _.map(init.companions, x => x ? new CompanionResponse(x) : null),
      searchtype: isNaN(init.searchtype) ? SearchType[init.searchtype] : init.searchtype,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.ConsolidationResponse
 */
export class ConsolidationResponse {
  itineraryid?: string;
  logid: number;
  parserphrases: string[];

  constructor(init?: Partial<ConsolidationResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Itinerary.Conversation
 */
export class Conversation {
  addeddatetime: Date;
  conversationid: number;
  itineraryid: string;
  message: string;
  messagedatetime: Date;
  modifieddatetime: Date;
  participant: Participant;
  userprofileid?: string;

  constructor(init?: Partial<Conversation>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      messagedatetime: init.messagedatetime ? new Date(init.messagedatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      participant: isNaN(init.participant) ? Participant[init.participant] : init.participant,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Itinerary.ConversationHint
 */
export class ConversationHint {
  cnchint: string;
  label: string;
  order: number;

  constructor(init?: Partial<ConversationHint>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.ConversationHistoryResponse
 */
export class ConversationHistoryResponse {
  conversations: ConversationResponse[];
  itineraryid: string;
  userprofileid: string;

  constructor(init?: Partial<ConversationHistoryResponse>) {
    Object.assign(this, init, {
      conversations: _.map(init.conversations, x => x ? new ConversationResponse(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Itinerary.ConversationMessage
 */
export class ConversationMessage {
  message: string;
  messagedatetime: Date;
  participant: Participant;

  constructor(init?: Partial<ConversationMessage>) {
    Object.assign(this, init, {
      messagedatetime: init.messagedatetime ? new Date(init.messagedatetime) : null,
      participant: isNaN(init.participant) ? Participant[init.participant] : init.participant,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.ConversationResponse
 */
export class ConversationResponse {
  message: string;
  participant: Participant;
  timestamp: Date;

  constructor(init?: Partial<ConversationResponse>) {
    Object.assign(this, init, {
      participant: isNaN(init.participant) ? Participant[init.participant] : init.participant,
      timestamp: init.timestamp ? new Date(init.timestamp) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Coordinate
 */
export class Coordinate {
  latitude: number;
  longitude: number;

  constructor(init?: Partial<Coordinate>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.MasterData.CountryDTO
 */
export class CountryDTO {
  code: string;
  name: string;

  constructor(init?: Partial<CountryDTO>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.CreateAgencyRequest
 */
export class CreateAgencyRequest {
  agencycode: string;
  name: string;

  constructor(init?: Partial<CreateAgencyRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.DebugConsolidationResponse
 */
export class DebugConsolidationResponse extends ConsolidationResponse {
  processedby: ProcessedByEnum;
  pureparserphrases: string[];
  pureparsertokens: string;
  wern1count: number;
  wern1parserphrases: string[];
  wern1parsertokens: string;
  wern1percent: string;
  wern1query: string;
  wern1understanding: string[];
  wern2parserphrases: string[];
  wern2parsertokens: string;
  wern2query: string;
  wernhtmlparserphrases: string[];

  constructor(init?: Partial<DebugConsolidationResponse>) {
    super(init);
    Object.assign(this, {
      processedby: isNaN(init.processedby) ? ProcessedByEnum[init.processedby] : init.processedby,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.DefaultTravelProfile
 */
export class DefaultTravelProfile {
  addeddatetime: Date;
  description: string;
  id: number;
  modifieddatetime: Date;
  name: string;

  constructor(init?: Partial<DefaultTravelProfile>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Travel.Designation
 */
export class Designation {
  designator: string;
  designatordescription: string;

  constructor(init?: Partial<Designation>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.DirectSellRequest
 */
export class DirectSellRequest {
  itineraryid: string;
  paxdetails: PaxDetails[];

  constructor(init?: Partial<DirectSellRequest>) {
    Object.assign(this, init, {
      paxdetails: _.map(init.paxdetails, x => x ? new PaxDetails(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.Discount
 */
export class Discount {
  discountcode: string;
  discounttype: string;
  discountvalue: number;
  enddate?: Date;
  maxallowed?: number;
  startdate?: Date;

  constructor(init?: Partial<Discount>) {
    Object.assign(this, init, {
      enddate: init.enddate ? new Date(init.enddate) : null,
      startdate: init.startdate ? new Date(init.startdate) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.PolicyController+DomainItem
 */
export class DomainItem {
  code: string;
  name: string;

  constructor(init?: Partial<DomainItem>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.Visualization.edge
 */
export class edge {
  arrows: string;
  dashes: boolean;
  from: string;
  id: string;
  label: string;
  to: string;

  constructor(init?: Partial<edge>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Exceptions.ErrorMessage
 */
export class ErrorMessage {
  messageid: MessageId;
  parameters: any[];

  constructor(init?: Partial<ErrorMessage>) {
    Object.assign(this, init, {
      messageid: isNaN(init.messageid) ? MessageId[init.messageid] : init.messageid,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.ItineraryController+ExecuteUserActionRequest
 */
export class ExecuteUserActionRequest {
  timetofixinseconds: number;
  timetopassinseconds: number;
  username: string;
  usertype: JMeterUserType;

  constructor(init?: Partial<ExecuteUserActionRequest>) {
    Object.assign(this, init, {
      usertype: isNaN(init.usertype) ? JMeterUserType[init.usertype] : init.usertype,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.ExternalLoginRequest
 */
export class ExternalLoginRequest {
  connectionid: string;
  deviceuuid: string;
  source?: ExternalLoginSource;
  token: string;

  constructor(init?: Partial<ExternalLoginRequest>) {
    Object.assign(this, init, {
      source: isNaN(init.source) ? ExternalLoginSource[init.source] : init.source,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.Feedback
 */
export class Feedback {
  addeddatetime: Date;
  conversation: FeedbackConversationMessage[];
  filedata: number[];
  filename: string;
  jiraparameters: JiraParameters;
  message: string;
  modifieddatetime: Date;
  preference?: string;
  solutionid?: string;
  summary: string;
  userprofileid: string;

  constructor(init?: Partial<Feedback>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      conversation: _.map(init.conversation, x => x ? new FeedbackConversationMessage(x) : null),
      jiraparameters: init.jiraparameters ? new JiraParameters(init.jiraparameters) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.FeedbackConversationMessage
 */
export class FeedbackConversationMessage extends ConversationMessage {
  feedback: Feedback;
  feedbackid: number;
  messageid: number;

  constructor(init?: Partial<FeedbackConversationMessage>) {
    super(init);
    Object.assign(this, {
      feedback: init.feedback ? new Feedback(init.feedback) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.FeeDetail
 */
export class FeeDetail {
  consentgiven: boolean;
  fee?: number;
  feetype: AuthTypeEnum;
  ispaid: boolean;
  taxrate?: number;
  totalfee?: number;

  constructor(init?: Partial<FeeDetail>) {
    Object.assign(this, init, {
      feetype: isNaN(init.feetype) ? AuthTypeEnum[init.feetype] : init.feetype,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.FlightConfirmation
 */
export class FlightConfirmation {
  billing: BillingDetail;
  changeandcancel: ChangeAndCancellation;
  details: FlightDetails[];
  id: string;
  passenger: BookingPassengerItineraryResponse;
  paymentcard: string;
  pricing: FlightPricingDetails;

  constructor(init?: Partial<FlightConfirmation>) {
    Object.assign(this, init, {
      billing: init.billing ? new BillingDetail(init.billing) : null,
      changeandcancel: init.changeandcancel ? new ChangeAndCancellation(init.changeandcancel) : null,
      details: _.map(init.details, x => x ? new FlightDetails(x) : null),
      passenger: init.passenger ? new BookingPassengerItineraryResponse(init.passenger) : null,
      pricing: init.pricing ? new FlightPricingDetails(init.pricing) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.FlightDetails
 */
export class FlightDetails {
  arrivaldatetime: Date;
  carrier: string;
  departuredatetime: Date;
  flightnumber: string;
  from: string;
  fromterminal: string;
  to: string;
  toterminal: string;

  constructor(init?: Partial<FlightDetails>) {
    Object.assign(this, init, {
      arrivaldatetime: init.arrivaldatetime ? new Date(init.arrivaldatetime) : null,
      departuredatetime: init.departuredatetime ? new Date(init.departuredatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Solution.FlightDropDownOption
 */
export class FlightDropDownOption {
  cost: number;
  fareclass: string;
  farepreference: string;
  id: string;
  isalternative: boolean;

  constructor(init?: Partial<FlightDropDownOption>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.IBookingConfirmation
 */
export class IBookingConfirmation {
  

  constructor(init?: Partial<IBookingConfirmation>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.FlightETicketSegment
 */
export class FlightETicketSegment {
  arrivaldatetime: Date;
  arrivalterminal: string;
  arrivalto: string;
  baggage: string;
  carrier: string;
  departuredatetime: Date;
  departurefrom: string;
  departureterminal: string;
  farebasis: string;
  flightnumber: string;
  notvalidafter?: Date;
  notvalidbefore?: Date;
  status: string;

  constructor(init?: Partial<FlightETicketSegment>) {
    Object.assign(this, init, {
      arrivaldatetime: init.arrivaldatetime ? new Date(init.arrivaldatetime) : null,
      departuredatetime: init.departuredatetime ? new Date(init.departuredatetime) : null,
      notvalidafter: init.notvalidafter ? new Date(init.notvalidafter) : null,
      notvalidbefore: init.notvalidbefore ? new Date(init.notvalidbefore) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.IFlightResponseItem
 */
export class IFlightResponseItem {
  type: FlightResponseItemType;

  constructor(init?: Partial<IFlightResponseItem>) {
    Object.assign(this, init, {
      type: isNaN(init.type) ? FlightResponseItemType[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.FlightPricingDetails
 */
export class FlightPricingDetails {
  basefare: number;
  taxes: number;
  total: number;

  constructor(init?: Partial<FlightPricingDetails>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.FlightPutParameters
 */
export class FlightPutParameters {
  flight: string;
  parameters: FlightQueryParameters;

  constructor(init?: Partial<FlightPutParameters>) {
    Object.assign(this, init, {
      parameters: init.parameters ? new FlightQueryParameters(init.parameters) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.FlightQueryParameters
 */
export class FlightQueryParameters {
  alternativeflight: string;
  flight: string;
  paxid: string;
  solution: string;

  constructor(init?: Partial<FlightQueryParameters>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.IItineraryItemResponse
 */
export class IItineraryItemResponse {
  conversationhint: ConversationHint[];
  currency: string;
  datasource: Vendor;
  dateorder: Date;
  guid: string;
  isavailable: boolean;
  message: string;
  needsapproval: boolean;
  penalty: number;
  rank: number;
  type: ItineraryItemResponseType;

  constructor(init?: Partial<IItineraryItemResponse>) {
    Object.assign(this, init, {
      conversationhint: _.map(init.conversationhint, x => x ? new ConversationHint(x) : null),
      datasource: isNaN(init.datasource) ? Vendor[init.datasource] : init.datasource,
      dateorder: init.dateorder ? new Date(init.dateorder) : null,
      type: isNaN(init.type) ? ItineraryItemResponseType[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.FlightResponse
 */
export class FlightResponse extends IItineraryItemResponse {
  arrival: Date;
  baggagepreference: string;
  carrier: string;
  carriername: string;
  cost: number;
  departure: Date;
  destination: string;
  destinationairportcoordinates: Coordinate;
  destinationairportname: string;
  destinationcityname: string;
  destinationcountry: string;
  dropdownoptions: FlightDropDownOption[];
  equipment: string;
  fareclass: string;
  farepreference: string;
  flighttime: string;
  isaddedorupdatedbychangemanagement: boolean;
  isalternative: boolean;
  isfeasible: boolean;
  legscount: number;
  mealpreference: string;
  nodeid: number;
  normalizedduration: number;
  operator: string;
  operatorname: string;
  origin: string;
  originairportcoordinates: Coordinate;
  originairportname: string;
  origincityname: string;
  origincountry: string;
  parentflightid?: string;
  paxguid: string;
  paymentprocessingstate: PaymentStateCode;
  paymentstatustimestamp?: Date;
  policyrank: number;
  policyviolations: string[];
  preferredseatnbr: string;
  primaryguid: string;
  tax: number;
  travelsector: string;
  traveltime: string;

  constructor(init?: Partial<FlightResponse>) {
    super(init);
    Object.assign(this, {
      arrival: init.arrival ? new Date(init.arrival) : null,
      departure: init.departure ? new Date(init.departure) : null,
      destinationairportcoordinates: init.destinationairportcoordinates ? new Coordinate(init.destinationairportcoordinates) : null,
      dropdownoptions: _.map(init.dropdownoptions, x => x ? new FlightDropDownOption(x) : null),
      originairportcoordinates: init.originairportcoordinates ? new Coordinate(init.originairportcoordinates) : null,
      paymentprocessingstate: isNaN(init.paymentprocessingstate) ? PaymentStateCode[init.paymentprocessingstate] : init.paymentprocessingstate,
      paymentstatustimestamp: init.paymentstatustimestamp ? new Date(init.paymentstatustimestamp) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Travel.FlightSeatMap
 */
export class FlightSeatMap {
  aircraft: string;
  airline: string;
  aislelocation: string;
  aislepositions: AislePositioning[];
  endairport: string;
  flightnbr: string;
  nbrofaisles: number;
  nbrofseatingrows: number;
  nbrofseatsperrow: number;
  seatidentifier: any[];
  seatingrows: SeatRow[];
  separator: string;
  serviceclass: string;
  startairport: string;

  constructor(init?: Partial<FlightSeatMap>) {
    Object.assign(this, init, {
      aislepositions: _.map(init.aislepositions, x => x ? new AislePositioning(x) : null),
      seatingrows: _.map(init.seatingrows, x => x ? new SeatRow(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.FlightSeatPreference
 */
export class FlightSeatPreference {
  legref: string;
  parameters: FlightQueryParameters;
  seatnbr: string;

  constructor(init?: Partial<FlightSeatPreference>) {
    Object.assign(this, init, {
      parameters: init.parameters ? new FlightQueryParameters(init.parameters) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.FlightStopOver
 */
export class FlightStopOver extends IFlightResponseItem {
  airportcode: string;
  airportcoordinates: Coordinate;
  airportname: string;
  arrivaltime: string;
  cityname: string;
  departuretime: string;
  durationhours: number;
  durationminutes: number;

  constructor(init?: Partial<FlightStopOver>) {
    super(init);
    Object.assign(this, {
      airportcoordinates: init.airportcoordinates ? new Coordinate(init.airportcoordinates) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Solution.GeneralHotelAmenity
 */
export class GeneralHotelAmenity {
  amenity: string;
  amenityid: string;
  image: string;

  constructor(init?: Partial<GeneralHotelAmenity>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GeoCoordinatePortable.GeoCoordinate
 */
export class GeoCoordinate {
  altitude: number;
  course: number;
  horizontalaccuracy: number;
  isunknown: boolean;
  latitude: number;
  longitude: number;
  speed: number;
  verticalaccuracy: number;

  constructor(init?: Partial<GeoCoordinate>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.AgentDesk.GetPrioritizedTransactionsReq
 */
export class GetPrioritizedTransactionsReq {
  count: number;
  states: ItineraryState[];

  constructor(init?: Partial<GetPrioritizedTransactionsReq>) {
    Object.assign(this, init, {
      states: _.map(init.states, x => isNaN(x) ? ItineraryState[x] : x),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.GetUserResponse
 */
export class GetUserResponse {
  avatarurl: string;
  userfullname: string;
  userprofileid: string;

  constructor(init?: Partial<GetUserResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.GraphicsResponse
 */
export class GraphicsResponse {
  expirytime: string;
  id?: string;
  image: string;
  imagetype: string;

  constructor(init?: Partial<GraphicsResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.GroupInivtation
 */
export class GroupInivtation {
  authkey: string;
  description: string;
  groupid: string;
  name: string;

  constructor(init?: Partial<GroupInivtation>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Exceptions.GtaErrorResponse
 */
export class GtaErrorResponse {
  errormessages: ErrorMessage[];
  exception: any;
  externalerrormessages: string[];
  responsecode: HttpStatusCode;

  constructor(init?: Partial<GtaErrorResponse>) {
    Object.assign(this, init, {
      errormessages: _.map(init.errormessages, x => x ? new ErrorMessage(x) : null),
      responsecode: isNaN(init.responsecode) ? HttpStatusCode[init.responsecode] : init.responsecode,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.GTAToken
 */
export class GTAToken {
  endwordposition: number;
  negation: boolean;
  schedulerflag: boolean;
  startwordposition: number;
  subtokens: GTAToken[];
  tokenmajortype: GTATokenType;
  tokentype: GTATokenType;
  value: string;

  constructor(init?: Partial<GTAToken>) {
    Object.assign(this, init, {
      subtokens: _.map(init.subtokens, x => x ? new GTAToken(x) : null),
      tokenmajortype: isNaN(init.tokenmajortype) ? GTATokenType[init.tokenmajortype] : init.tokenmajortype,
      tokentype: isNaN(init.tokentype) ? GTATokenType[init.tokentype] : init.tokentype,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.HighlightCell`1[[GTARESTServices.Web.Api.Models.Itinerary.HighlightPositionAndValue, GTARESTServices.Web.Api, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]
 */
export class HighlightCell_of_HighlightPositionAndValue {
  positions: HighlightPositionAndValue[];
  type: HighlightSearchType;

  constructor(init?: Partial<HighlightCell_of_HighlightPositionAndValue>) {
    Object.assign(this, init, {
      positions: _.map(init.positions, x => x ? new HighlightPositionAndValue(x) : null),
      type: isNaN(init.type) ? HighlightSearchType[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.HighlightPosition
 */
export class HighlightPosition {
  end: number;
  start: number;

  constructor(init?: Partial<HighlightPosition>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.HighlightPositionAndValue
 */
export class HighlightPositionAndValue extends HighlightPosition {
  id: string;

  constructor(init?: Partial<HighlightPositionAndValue>) {
    super(init);
    Object.assign(this, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.HighlightSearchListResponse
 */
export class HighlightSearchListResponse {
  dontinitiatesearch: boolean;
  itineraryid: string;
  nosearch: boolean;
  prescanresponse: PreScanResponse;
  query: string;
  responses: HighlightSearchResponse[];
  tokenizationlogs: TokenizationLogMessage[];

  constructor(init?: Partial<HighlightSearchListResponse>) {
    Object.assign(this, init, {
      prescanresponse: init.prescanresponse ? new PreScanResponse(init.prescanresponse) : null,
      responses: _.map(init.responses, x => x ? new HighlightSearchResponse(x) : null),
      tokenizationlogs: _.map(init.tokenizationlogs, x => x ? new TokenizationLogMessage(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.HighlightSearchResponse
 */
export class HighlightSearchResponse {
  isplural: boolean;
  needtoreplaceword: boolean;
  position: HighlightPosition;
  relationshiptypeid?: number;
  results: HighlightSearchResult[];
  type: HighlightSearchType;
  value: string;

  constructor(init?: Partial<HighlightSearchResponse>) {
    Object.assign(this, init, {
      position: init.position ? new HighlightPosition(init.position) : null,
      results: _.map(init.results, x => x ? new HighlightSearchResult(x) : null),
      type: isNaN(init.type) ? HighlightSearchType[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.HighlightSearchResult
 */
export class HighlightSearchResult {
  airportcode: string;
  airportname: string;
  citycode: string;
  cityname: string;
  country: string;
  countrycode: string;
  group: string;
  id: string;
  isdefault?: boolean;
  name: string;
  regioncode: string;
  regionname: string;
  state: string;

  constructor(init?: Partial<HighlightSearchResult>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.HotelConfirmation
 */
export class HotelConfirmation {
  billing: BillingDetail;
  changeandcancel: ChangeAndCancellation;
  details: HotelDetails;
  id: string;
  passenger: BookingPassengerItineraryResponse;
  paymentcard: string;
  pricing: HotelPricingDetails;

  constructor(init?: Partial<HotelConfirmation>) {
    Object.assign(this, init, {
      billing: init.billing ? new BillingDetail(init.billing) : null,
      changeandcancel: init.changeandcancel ? new ChangeAndCancellation(init.changeandcancel) : null,
      details: init.details ? new HotelDetails(init.details) : null,
      passenger: init.passenger ? new BookingPassengerItineraryResponse(init.passenger) : null,
      pricing: init.pricing ? new HotelPricingDetails(init.pricing) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.HotelDetails
 */
export class HotelDetails {
  address: string;
  checkin: Date;
  checkout: Date;
  itineraryitemid: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  roomtype: string;
  star: number;

  constructor(init?: Partial<HotelDetails>) {
    Object.assign(this, init, {
      checkin: init.checkin ? new Date(init.checkin) : null,
      checkout: init.checkout ? new Date(init.checkout) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.HotelRoomResponse+HotelFee
 */
export class HotelFee {
  amount: string;
  description: string;

  constructor(init?: Partial<HotelFee>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.HotelImageDto
 */
export class HotelImageDto {
  caption: string;
  height: number;
  image: string;
  width: number;

  constructor(init?: Partial<HotelImageDto>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.HotelPriceConstraint
 */
export class HotelPriceConstraint {
  amount: number;
  currency: string;
  staynight?: number;

  constructor(init?: Partial<HotelPriceConstraint>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.HotelPricingDetails
 */
export class HotelPricingDetails {
  nightlyrate: NightlyRate;
  total: number;

  constructor(init?: Partial<HotelPricingDetails>) {
    Object.assign(this, init, {
      nightlyrate: init.nightlyrate ? new NightlyRate(init.nightlyrate) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.HotelPutParameters
 */
export class HotelPutParameters {
  goroomintersect: number;
  hotel: string;
  parameters: HotelQueryParameters;

  constructor(init?: Partial<HotelPutParameters>) {
    Object.assign(this, init, {
      parameters: init.parameters ? new HotelQueryParameters(init.parameters) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.HotelQueryParameters
 */
export class HotelQueryParameters {
  alternativehotel: string;
  checkin: string;
  checkout: string;
  hotelid: string;
  ispromoalternative: boolean;
  paxid: string;
  solution: string;

  constructor(init?: Partial<HotelQueryParameters>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.HotelResponse
 */
export class HotelResponse extends IItineraryItemResponse {
  address1: string;
  address2: string;
  address3: string;
  allimages: HotelImageDto[];
  alternativehotel: HotelResponse;
  amenities: GeneralHotelAmenity[];
  amenitiesdescription: string;
  checkin: Date;
  checkininstructions: string;
  checkout: Date;
  cityname: string;
  country: string;
  defaultroomguid: string;
  hasalternative: boolean;
  hotelbookingreference: string;
  hotelchain: string;
  hotelcode: string;
  hotelcode2: string;
  hotelname: string;
  image: string;
  isaddedorupdatedbychangemanagement: boolean;
  isalternative: boolean;
  ispromotional: boolean;
  latitude: number;
  locationdescription: string;
  longitude: number;
  maximumamount: number;
  minimumamount: number;
  nodeid: number;
  occupants: Occupant[];
  paxguid: string;
  paymentprocessingstate: PaymentStateCode;
  paymentstatustimestamp?: Date;
  phone: string;
  policyviolations: string[];
  postalcode: string;
  promoalternativescachekey: string;
  rooms: HotelRoomResponse[];
  sessionid: string;
  shortdescription: string;
  starrating: number;
  stateprovince: string;

  constructor(init?: Partial<HotelResponse>) {
    super(init);
    Object.assign(this, {
      allimages: _.map(init.allimages, x => x ? new HotelImageDto(x) : null),
      alternativehotel: init.alternativehotel ? new HotelResponse(init.alternativehotel) : null,
      amenities: _.map(init.amenities, x => x ? new GeneralHotelAmenity(x) : null),
      checkin: init.checkin ? new Date(init.checkin) : null,
      checkout: init.checkout ? new Date(init.checkout) : null,
      occupants: _.map(init.occupants, x => x ? new Occupant(x) : null),
      paymentprocessingstate: isNaN(init.paymentprocessingstate) ? PaymentStateCode[init.paymentprocessingstate] : init.paymentprocessingstate,
      paymentstatustimestamp: init.paymentstatustimestamp ? new Date(init.paymentstatustimestamp) : null,
      rooms: _.map(init.rooms, x => x ? new HotelRoomResponse(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.HotelRoomPutBodyParameters
 */
export class HotelRoomPutBodyParameters {
  goroomintersect: number;
  hotelroom: string;
  parameters: HotelRoomPutQueryParameters;

  constructor(init?: Partial<HotelRoomPutBodyParameters>) {
    Object.assign(this, init, {
      parameters: init.parameters ? new HotelRoomPutQueryParameters(init.parameters) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.HotelRoomPutQueryParameters
 */
export class HotelRoomPutQueryParameters {
  paxid: string;
  solution: string;

  constructor(init?: Partial<HotelRoomPutQueryParameters>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.HotelRoomQueryParameters
 */
export class HotelRoomQueryParameters {
  checkin: Date;
  checkout: Date;
  hotelcode: string;
  hotelid: string;
  paxid: string;
  solution: string;

  constructor(init?: Partial<HotelRoomQueryParameters>) {
    Object.assign(this, init, {
      checkin: init.checkin ? new Date(init.checkin) : null,
      checkout: init.checkout ? new Date(init.checkout) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.HotelRoomResponse
 */
export class HotelRoomResponse extends IItineraryItemResponse {
  alternativeroom: HotelRoomResponse;
  amenities: GeneralHotelAmenity[];
  averagerate: number;
  averagerateusd: number;
  bedtypes: string[];
  cancellationpolicy: string;
  checkin: Date;
  checkout: Date;
  code: string;
  cost: number;
  costusd: number;
  description: string;
  feescollectedbyhotel: HotelFee[];
  feescollectedbyhoteldaily: number;
  feescollectedbyhoteltotal: number;
  fromalternativehotel: boolean;
  hotelcurrencycode: string;
  image: string;
  images: string[];
  isalternative: boolean;
  ispromotional: boolean;
  maxroomoccupancy: number;
  nightlyrate: number[];
  nightlyrateusd: number[];
  packageid: string;
  primaryguid?: string;
  refundability: string;
  roomtype: string;
  smoking: string;
  surchargetotal: number;
  surchargetotalusd: number;
  totalbeforetax: number;
  totalbeforetaxusd: number;

  constructor(init?: Partial<HotelRoomResponse>) {
    super(init);
    Object.assign(this, {
      alternativeroom: init.alternativeroom ? new HotelRoomResponse(init.alternativeroom) : null,
      amenities: _.map(init.amenities, x => x ? new GeneralHotelAmenity(x) : null),
      checkin: init.checkin ? new Date(init.checkin) : null,
      checkout: init.checkout ? new Date(init.checkout) : null,
      feescollectedbyhotel: _.map(init.feescollectedbyhotel, x => x ? new HotelFee(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.HotelSearchParameters
 */
export class HotelSearchParameters {
  latitude: number;
  longitude: number;
  primaryhotelid: string;
  solutionid: string;

  constructor(init?: Partial<HotelSearchParameters>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.HubSpotParameters
 */
export class HubSpotParameters {
  ipaddress: string;
  pagename: string;
  pageurl: string;
  redirect: string;

  constructor(init?: Partial<HubSpotParameters>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.FlightETicketResponse
 */
export class FlightETicketResponse extends IBookingConfirmation {
  airlinelocator: string;
  flights: FlightETicketSegment[];
  isissued: boolean;
  issueddate: Date;
  recordlocator: string;
  ticketnumber: string;
  travlername: PersonNameBase;

  constructor(init?: Partial<FlightETicketResponse>) {
    super(init);
    Object.assign(this, {
      flights: _.map(init.flights, x => x ? new FlightETicketSegment(x) : null),
      issueddate: init.issueddate ? new Date(init.issueddate) : null,
      travlername: init.travlername ? new PersonNameBase(init.travlername) : null,
    });
  }
}

/**
 * Source class: System.Collections.Generic.IEqualityComparer`1[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
 */
export class IEqualityComparer_of_string {
  

  constructor(init?: Partial<IEqualityComparer_of_string>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.FlightLegDto
 */
export class FlightLegDto extends IFlightResponseItem {
  arrival: Date;
  arrivaltime: string;
  availablebaggagepreferences: string[];
  availablefareclasses: string[];
  availablefarepreferences: string[];
  availablemealpreferences: string[];
  availableseatnumbers: string[][];
  baggagepreference: string;
  carrierbadgeurl: string;
  carrierbaggageurl: string;
  carriercode: string;
  carrierlogourl: string;
  carriername: string;
  changedurationindays: number;
  code: string;
  codeshareoperator: string;
  codeshareoperatorname: string;
  departure: Date;
  departuretime: string;
  destination: string;
  destinationairportcoordinates: Coordinate;
  destinationairportname: string;
  destinationcityname: string;
  destinationcountry: string;
  equipment: string;
  fareclass: string;
  farepreference: string;
  flightnumber: string;
  flighttime: string;
  guid: string;
  layoverinfoexist: boolean;
  mealpreference: string;
  normalizedduration: number;
  origin: string;
  originairportcoordinates: Coordinate;
  originairportname: string;
  origincityname: string;
  origincountry: string;
  parentguid: string;
  paxguid: string;
  penaltyamts: { [id: string]: number; };
  preferredseatnbr: string;
  ref: string;
  seatmap: FlightSeatMap;
  seatnumber: string;
  seq: number;

  constructor(init?: Partial<FlightLegDto>) {
    super(init);
    Object.assign(this, {
      arrival: init.arrival ? new Date(init.arrival) : null,
      departure: init.departure ? new Date(init.departure) : null,
      destinationairportcoordinates: init.destinationairportcoordinates ? new Coordinate(init.destinationairportcoordinates) : null,
      originairportcoordinates: init.originairportcoordinates ? new Coordinate(init.originairportcoordinates) : null,
      seatmap: init.seatmap ? new FlightSeatMap(init.seatmap) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.FlightResponseWithLegs
 */
export class FlightResponseWithLegs extends FlightResponse {
  legs: IFlightResponseItem[];

  constructor(init?: Partial<FlightResponseWithLegs>) {
    super(init);
    Object.assign(this, {
      legs: _.map(init.legs, x => {
        let xTypeNum = isNaN(x.type) ? FlightResponseItemType[x.type] : x.type;
        if (xTypeNum == FlightResponseItemType.Leg)
          return new FlightLegDto(x);
        else if (xTypeNum == FlightResponseItemType.StopOver)
          return new FlightStopOver(x);
        return new IFlightResponseItem(x);
      }),
    });
  }
}

/**
 * Source class: GTA.Common.ModelInterfaces.ILocation
 */
export class ILocation {
  airportcode: string;
  airportname: string;
  citycode: string;
  cityname: string;
  country: string;
  latitude: number;
  longitude: number;

  constructor(init?: Partial<ILocation>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.InputCityAutocomplete
 */
export class InputCityAutocomplete {
  countrycode: string;
  statecode: string;
  words: string;

  constructor(init?: Partial<InputCityAutocomplete>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.InputDTOCode
 */
export class InputDTOCode {
  code: string;

  constructor(init?: Partial<InputDTOCode>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.InvoiceRequest
 */
export class InvoiceRequest {
  copyalltoemail: string;
  itineraryiteminvoicerequests: ItineraryItemInvoiceRequest[];
  sendemail: boolean;

  constructor(init?: Partial<InvoiceRequest>) {
    Object.assign(this, init, {
      itineraryiteminvoicerequests: _.map(init.itineraryiteminvoicerequests, x => x ? new ItineraryItemInvoiceRequest(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.ModelInterfaces.IPax
 */
export class IPax {
  dateofbirth?: Date;
  guid: string;
  paxname: string;

  constructor(init?: Partial<IPax>) {
    Object.assign(this, init, {
      dateofbirth: init.dateofbirth ? new Date(init.dateofbirth) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Interface.IPhraseReader
 */
export class IPhraseReader {
  actioncount: number;
  actioncount2: number;
  actions1: PhraseAction1[];
  actions2: PhraseAction2[];
  aftertcity: ILocation;
  aftertcitytoken: GTAToken;
  beforetcity: ILocation;
  beforetcitytoken: GTAToken;
  city: ILocation;
  connectioncity: ILocation;
  connectionduration: number;
  connectiontoken: GTAToken;
  date: ParserDate;
  datetoken: GTAToken;
  duration: number;
  durationtoken: GTAToken;
  enddate: ParserDate;
  flightattributes: GTAToken[];
  flightattributes_mpp: MPPTreeNodeToken[];
  fromcity: ILocation;
  hasadd: boolean;
  hasaftertcity: boolean;
  hasaftertoken: boolean;
  hasairportcode: boolean;
  hasairportname: boolean;
  hasback: boolean;
  hasbeforetcity: boolean;
  hasbeforetoken: boolean;
  hascabinclasskeywordtoken: boolean;
  haschangetoken: boolean;
  hascheckinkeyword: boolean;
  hascheckoutkeyword: boolean;
  hascity: boolean;
  hasconnection: boolean;
  hasconnectionduration: boolean;
  hasdate: boolean;
  hasdateinterval: boolean;
  hasdateshift: boolean;
  hasdowngradetoken: boolean;
  hasduration: boolean;
  hasextend: boolean;
  hasflightattributes: boolean;
  hasflightkeyword: boolean;
  hasforcity: boolean;
  hasfortheday: boolean;
  hasforthenight: boolean;
  hasfromcity: boolean;
  hasfromcityonly: boolean;
  hashometoken: boolean;
  hashotel: boolean;
  hashotelattributes: boolean;
  hashotelkeyword: boolean;
  hashotelpriceconstraint: boolean;
  hashoteltokeninduration: boolean;
  hasincity: boolean;
  hasinsteadtcity: boolean;
  hasinsteadtoken: boolean;
  hasjoin: boolean;
  hasmessage: boolean;
  hasmonthdateinterval: boolean;
  hasonflight: boolean;
  hasoptionalflight: boolean;
  haspaxlist: boolean;
  haspaxlistforremove: boolean;
  haspoi: boolean;
  hasprofile: boolean;
  hasremove: boolean;
  hasreturn: boolean;
  hasroundtrip: boolean;
  hassameflightaspax: boolean;
  hassamehotelaspax: boolean;
  hasshow: boolean;
  hasthen: boolean;
  hastime: boolean;
  hastocity: boolean;
  hastopax: boolean;
  hasunresolvedthere: boolean;
  hasupgradetoken: boolean;
  hasweekend: boolean;
  haswpax: boolean;
  hotelattributes: GTAToken[];
  hotelattributes_mpp: MPPTreeNodeToken[];
  hotelpriceconstraint: HotelPriceConstraint;
  incity: ILocation;
  incitytoken: GTAToken;
  inseadtcitytoken: GTAToken;
  insteadtcity: ILocation;
  messagetoken: GTAToken;
  paxlist: IPax[];
  paxlist_instead2ndset: IPax[];
  paxlistbeingjoined: IPax[];
  paxlistbeingjoinedtokens: MPPTreeNodeToken[];
  paxlistforremove: IPax[];
  paxlistjoining: IPax[];
  paxtokenlistforremove: MPPTreeNodeToken[];
  phrase: PhrasePath;
  phrasenumber: number;
  poicoordinate: GeoCoordinate;
  profiletoken: GTAToken;
  returnattributes: MPPTreeNodeToken[];
  returntoken: GTAToken;
  sameflight: boolean;
  sameflightaspax: IPax;
  samehotel: boolean;
  samehotelaspax: IPax;
  schedulerdateflagforduration: boolean;
  shareroom: boolean;
  startdate: ParserDate;
  timeranges: TimeRange[];
  tocity: ILocation[];
  tocityname: string;
  tocitytoken: GTAToken[];
  topax: IPax;
  type: PhraseType;
  wpax: IPax[];

  constructor(init?: Partial<IPhraseReader>) {
    Object.assign(this, init, {
      actions1: _.map(init.actions1, x => isNaN(x) ? PhraseAction1[x] : x),
      actions2: _.map(init.actions2, x => isNaN(x) ? PhraseAction2[x] : x),
      aftertcity: init.aftertcity ? new ILocation(init.aftertcity) : null,
      aftertcitytoken: init.aftertcitytoken ? new GTAToken(init.aftertcitytoken) : null,
      beforetcity: init.beforetcity ? new ILocation(init.beforetcity) : null,
      beforetcitytoken: init.beforetcitytoken ? new GTAToken(init.beforetcitytoken) : null,
      city: init.city ? new ILocation(init.city) : null,
      connectioncity: init.connectioncity ? new ILocation(init.connectioncity) : null,
      connectiontoken: init.connectiontoken ? new GTAToken(init.connectiontoken) : null,
      date: init.date ? new ParserDate(init.date) : null,
      datetoken: init.datetoken ? new GTAToken(init.datetoken) : null,
      durationtoken: init.durationtoken ? new GTAToken(init.durationtoken) : null,
      enddate: init.enddate ? new ParserDate(init.enddate) : null,
      flightattributes: _.map(init.flightattributes, x => x ? new GTAToken(x) : null),
      flightattributes_mpp: _.map(init.flightattributes_mpp, x => x ? new MPPTreeNodeToken(x) : null),
      fromcity: init.fromcity ? new ILocation(init.fromcity) : null,
      hotelattributes: _.map(init.hotelattributes, x => x ? new GTAToken(x) : null),
      hotelattributes_mpp: _.map(init.hotelattributes_mpp, x => x ? new MPPTreeNodeToken(x) : null),
      hotelpriceconstraint: init.hotelpriceconstraint ? new HotelPriceConstraint(init.hotelpriceconstraint) : null,
      incity: init.incity ? new ILocation(init.incity) : null,
      incitytoken: init.incitytoken ? new GTAToken(init.incitytoken) : null,
      inseadtcitytoken: init.inseadtcitytoken ? new GTAToken(init.inseadtcitytoken) : null,
      insteadtcity: init.insteadtcity ? new ILocation(init.insteadtcity) : null,
      messagetoken: init.messagetoken ? new GTAToken(init.messagetoken) : null,
      paxlist: _.map(init.paxlist, x => x ? new IPax(x) : null),
      paxlist_instead2ndset: _.map(init.paxlist_instead2ndset, x => x ? new IPax(x) : null),
      paxlistbeingjoined: _.map(init.paxlistbeingjoined, x => x ? new IPax(x) : null),
      paxlistbeingjoinedtokens: _.map(init.paxlistbeingjoinedtokens, x => x ? new MPPTreeNodeToken(x) : null),
      paxlistforremove: _.map(init.paxlistforremove, x => x ? new IPax(x) : null),
      paxlistjoining: _.map(init.paxlistjoining, x => x ? new IPax(x) : null),
      paxtokenlistforremove: _.map(init.paxtokenlistforremove, x => x ? new MPPTreeNodeToken(x) : null),
      phrase: init.phrase ? new PhrasePath(init.phrase) : null,
      poicoordinate: init.poicoordinate ? new GeoCoordinate(init.poicoordinate) : null,
      profiletoken: init.profiletoken ? new GTAToken(init.profiletoken) : null,
      returnattributes: _.map(init.returnattributes, x => x ? new MPPTreeNodeToken(x) : null),
      returntoken: init.returntoken ? new GTAToken(init.returntoken) : null,
      sameflightaspax: init.sameflightaspax ? new IPax(init.sameflightaspax) : null,
      samehotelaspax: init.samehotelaspax ? new IPax(init.samehotelaspax) : null,
      startdate: init.startdate ? new ParserDate(init.startdate) : null,
      timeranges: _.map(init.timeranges, x => x ? new TimeRange(x) : null),
      tocity: _.map(init.tocity, x => x ? new ILocation(x) : null),
      tocitytoken: _.map(init.tocitytoken, x => x ? new GTAToken(x) : null),
      topax: init.topax ? new IPax(init.topax) : null,
      type: isNaN(init.type) ? PhraseType[init.type] : init.type,
      wpax: _.map(init.wpax, x => x ? new IPax(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.ISummaryItem
 */
export class ISummaryItem {
  id: string;
  price: number;

  constructor(init?: Partial<ISummaryItem>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Booking.ItineraryBookingResponse
 */
export class ItineraryBookingResponse {
  errorids: number[];
  errormessages: string[];
  issuccessful: boolean;
  itemid: string;
  itineraryid: string;
  paidstatustimestamp?: Date;

  constructor(init?: Partial<ItineraryBookingResponse>) {
    Object.assign(this, init, {
      paidstatustimestamp: init.paidstatustimestamp ? new Date(init.paidstatustimestamp) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Solution.ItineraryDetail
 */
export class ItineraryDetail {
  addeddatetime: Date;
  enddate?: Date;
  featurecity: string;
  isfavorite: boolean;
  modifieddatetime?: Date;
  name: string;
  paymentstatus: string;
  solutionid: string;
  startdate?: Date;
  tripimage: string;

  constructor(init?: Partial<ItineraryDetail>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      enddate: init.enddate ? new Date(init.enddate) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      startdate: init.startdate ? new Date(init.startdate) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AgentDesk.ItineraryDto
 */
export class ItineraryDto {
  enddate?: Date;
  itineraryid: string;
  itinerarystate: ItineraryState;
  name: string;
  startdate?: Date;

  constructor(init?: Partial<ItineraryDto>) {
    Object.assign(this, init, {
      enddate: init.enddate ? new Date(init.enddate) : null,
      itinerarystate: isNaN(init.itinerarystate) ? ItineraryState[init.itinerarystate] : init.itinerarystate,
      startdate: init.startdate ? new Date(init.startdate) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.ItineraryItemInvoiceRequest
 */
export class ItineraryItemInvoiceRequest {
  getconfirmation: boolean;
  getticket: boolean;
  itineraryitemid: string;

  constructor(init?: Partial<ItineraryItemInvoiceRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AgentDesk.ItineraryReviewDto
 */
export class ItineraryReviewDto {
  itinerary: ResponseDto;
  itineraryid: string;
  network: VisualizationResponse;
  notes: string;
  originalquery: string;
  parserspeak: string;
  prescanresponse: PreScanReviewChunks;

  constructor(init?: Partial<ItineraryReviewDto>) {
    Object.assign(this, init, {
      itinerary: init.itinerary ? new ResponseDto(init.itinerary) : null,
      network: init.network ? new VisualizationResponse(init.network) : null,
      prescanresponse: init.prescanresponse ? new PreScanReviewChunks(init.prescanresponse) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.JiraParameters
 */
export class JiraParameters {
  issuetype: string;
  project: string;

  constructor(init?: Partial<JiraParameters>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: System.Collections.Generic.Dictionary`2+KeyCollection[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.Collections.Generic.List`1[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
 */
export class KeyCollection_of_string_and_List_of_string {
  count: number;

  constructor(init?: Partial<KeyCollection_of_string_and_List_of_string>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: System.Collections.Generic.Dictionary`2+KeyCollection[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.Collections.Generic.List`1[[GTA.Common.Models.Parser.WordPosition, GTA.Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
 */
export class KeyCollection_of_string_and_List_of_WordPosition {
  count: number;

  constructor(init?: Partial<KeyCollection_of_string_and_List_of_WordPosition>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.KeyValue
 */
export class KeyValue {
  keyvaluecategorycode: string;
  keyvaluecode: string;
  keyvaluedescription: string;
  position: number;

  constructor(init?: Partial<KeyValue>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: System.Collections.Generic.KeyValuePair`2[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
 */
export class KeyValuePair_of_string_and_string {
  key: string;
  value: string;

  constructor(init?: Partial<KeyValuePair_of_string_and_string>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Reports.LoadTestReport
 */
export class LoadTestReport {
  clientresponded: number;
  countbatchsize: number;
  countbooked: number;
  countdraft: number;
  countrequests: number;
  countsent: number;
  countsolution: number;
  countsuspense: number;
  finished: boolean;
  stats: LoadTestReportStatGroup[];
  timeaveragetobooked: number;
  timeaveragetoclientresponded: number;
  timeaveragetodraft: number;
  timeaveragetosolution: number;
  timeaveragetosuspense: number;

  constructor(init?: Partial<LoadTestReport>) {
    Object.assign(this, init, {
      stats: _.map(init.stats, x => x ? new LoadTestReportStatGroup(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Reports.LoadTestReportStat
 */
export class LoadTestReportStat {
  displaytype: LoadTestReportStatType;
  style: DashboardLabelStyleType;
  title: string;
  tooltip: string;
  value: number;

  constructor(init?: Partial<LoadTestReportStat>) {
    Object.assign(this, init, {
      displaytype: isNaN(init.displaytype) ? LoadTestReportStatType[init.displaytype] : init.displaytype,
      style: isNaN(init.style) ? DashboardLabelStyleType[init.style] : init.style,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Reports.LoadTestReportStatGroup
 */
export class LoadTestReportStatGroup {
  stats: LoadTestReportStat[];
  title: string;

  constructor(init?: Partial<LoadTestReportStatGroup>) {
    Object.assign(this, init, {
      stats: _.map(init.stats, x => x ? new LoadTestReportStat(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.MasterData.LocalizeMessageResponse
 */
export class LocalizeMessageResponse {
  messagetext: string;
  messagetitle: string;

  constructor(init?: Partial<LocalizeMessageResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.LoginRequest
 */
export class LoginRequest {
  connectionid: string;
  deviceuuid: string;
  password: string;
  username: string;

  constructor(init?: Partial<LoginRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.MicrositeSurvey
 */
export class MicrositeSurvey {
  business: boolean;
  city: string;
  country: string;
  email: string;
  id: string;
  leisure: boolean;
  region: string;
  timestamp: Date;
  travelamount: string;

  constructor(init?: Partial<MicrositeSurvey>) {
    Object.assign(this, init, {
      timestamp: init.timestamp ? new Date(init.timestamp) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MicrositeSurveyHubSpot
 */
export class MicrositeSurveyHubSpot {
  formdata: MicrositeSurvey;
  hsparams: HubSpotParameters;

  constructor(init?: Partial<MicrositeSurveyHubSpot>) {
    Object.assign(this, init, {
      formdata: init.formdata ? new MicrositeSurvey(init.formdata) : null,
      hsparams: init.hsparams ? new HubSpotParameters(init.hsparams) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.MPPTreeNodeToken
 */
export class MPPTreeNodeToken {
  action1: PhraseAction1;
  action2: PhraseAction2;
  name: string;
  token: GTAToken;

  constructor(init?: Partial<MPPTreeNodeToken>) {
    Object.assign(this, init, {
      action1: isNaN(init.action1) ? PhraseAction1[init.action1] : init.action1,
      action2: isNaN(init.action2) ? PhraseAction2[init.action2] : init.action2,
      token: init.token ? new GTAToken(init.token) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MultiMap`2[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
 */
export class MultiMap_of_string_and_string {
  comparer: IEqualityComparer_of_string;
  count: number;
  countall: number;
  item: string[];
  keys: KeyCollection_of_string_and_List_of_string;
  values: ValueCollection_of_string_and_List_of_string;

  constructor(init?: Partial<MultiMap_of_string_and_string>) {
    Object.assign(this, init, {
      comparer: init.comparer ? new IEqualityComparer_of_string(init.comparer) : null,
      keys: init.keys ? new KeyCollection_of_string_and_List_of_string(init.keys) : null,
      values: init.values ? new ValueCollection_of_string_and_List_of_string(init.values) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MultiMap`2[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[GTA.Common.Models.Parser.WordPosition, GTA.Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]
 */
export class MultiMap_of_string_and_WordPosition {
  comparer: IEqualityComparer_of_string;
  count: number;
  countall: number;
  item: WordPosition[];
  keys: KeyCollection_of_string_and_List_of_WordPosition;
  values: ValueCollection_of_string_and_List_of_WordPosition;

  constructor(init?: Partial<MultiMap_of_string_and_WordPosition>) {
    Object.assign(this, init, {
      comparer: init.comparer ? new IEqualityComparer_of_string(init.comparer) : null,
      item: _.map(init.item, x => x ? new WordPosition(x) : null),
      keys: init.keys ? new KeyCollection_of_string_and_List_of_WordPosition(init.keys) : null,
      values: init.values ? new ValueCollection_of_string_and_List_of_WordPosition(init.values) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.NetworkResolution
 */
export class NetworkResolution {
  destination: string;
  message: string;
  nodeid: string;
  origin: string;
  paxname: string;
  resolutionformat: string;
  resolutionresponse: string;
  resolutiontype: NetworkResolutionType;

  constructor(init?: Partial<NetworkResolution>) {
    Object.assign(this, init, {
      resolutiontype: isNaN(init.resolutiontype) ? NetworkResolutionType[init.resolutiontype] : init.resolutiontype,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.NewWorkspaceRequest
 */
export class NewWorkspaceRequest {
  agencycode: string;
  clientprofilename: string;
  externalid: string;

  constructor(init?: Partial<NewWorkspaceRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.NightlyRate
 */
export class NightlyRate {
  baserate: number;
  taxes: number;
  total: number;

  constructor(init?: Partial<NightlyRate>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.Visualization.node
 */
export class node {
  allowedtomovex: boolean;
  allowedtomovey: boolean;
  borderwidth: number;
  group: string;
  id: string;
  image: string;
  label: string;
  shape: string;

  constructor(init?: Partial<node>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Solution.Occupant
 */
export class Occupant {
  id: string;
  name: string;

  constructor(init?: Partial<Occupant>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Config.Policy
 */
export class OldPolicy {
  addeddatetime: Date;
  description: string;
  hotelrequiredforlongtrip: boolean;
  modifieddatetime: Date;
  policyid: number;
  timerequired: boolean;

  constructor(init?: Partial<OldPolicy>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.Date
 */
export class ParserDate {
  dateaction: DateTimeAction;
  isresolved: boolean;
  token: GTAToken;
  type: RelativityIdentifier;
  value: string;

  constructor(init?: Partial<ParserDate>) {
    Object.assign(this, init, {
      dateaction: isNaN(init.dateaction) ? DateTimeAction[init.dateaction] : init.dateaction,
      token: init.token ? new GTAToken(init.token) : null,
      type: isNaN(init.type) ? RelativityIdentifier[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Utils.ParserSpeakCliDto
 */
export class ParserSpeakCliDto {
  itineraryid: string;
  nodes: ParserSpeakNode[];

  constructor(init?: Partial<ParserSpeakCliDto>) {
    Object.assign(this, init, {
      nodes: _.map(init.nodes, x => x ? new ParserSpeakNode(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Utils.ParserSpeakNode
 */
export class ParserSpeakNode {
  flight: ParserSpeakNodeFlightRFM;
  hotel: ParserSpeakNodeHotelRFM;

  constructor(init?: Partial<ParserSpeakNode>) {
    Object.assign(this, init, {
      flight: init.flight ? new ParserSpeakNodeFlightRFM(init.flight) : null,
      hotel: init.hotel ? new ParserSpeakNodeHotelRFM(init.hotel) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Utils.ParserSpeakNodeFlightRFM
 */
export class ParserSpeakNodeFlightRFM {
  airline: string;
  date: string;
  flightclass: string;
  flightnumber: string;
  from: string;
  isnonstop: boolean;
  noflight: boolean;
  time: string;
  to: string;
  via: string;

  constructor(init?: Partial<ParserSpeakNodeFlightRFM>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Utils.ParserSpeakNodeHotelRFM
 */
export class ParserSpeakNodeHotelRFM {
  brand: string;
  datecheckin: string;
  datecheckout: string;
  duration: string;
  isverified: boolean;
  near: string;
  rating: string;
  where: string;

  constructor(init?: Partial<ParserSpeakNodeHotelRFM>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.Time
 */
export class ParserTime {
  timeaction: DateTimeAction;
  type: RelativityIdentifier;
  value: string;

  constructor(init?: Partial<ParserTime>) {
    Object.assign(this, init, {
      timeaction: isNaN(init.timeaction) ? DateTimeAction[init.timeaction] : init.timeaction,
      type: isNaN(init.type) ? RelativityIdentifier[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.PassengerItem
 */
export class PassengerItem {
  enddatetime: Date;
  itemid: string;
  startdatetime: Date;

  constructor(init?: Partial<PassengerItem>) {
    Object.assign(this, init, {
      enddatetime: init.enddatetime ? new Date(init.enddatetime) : null,
      startdatetime: init.startdatetime ? new Date(init.startdatetime) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.PassengerResponse
 */
export class PassengerResponse {
  avatarurl: string;
  feedetails: FeeDetail;
  itineraryitems: string[];
  itineraryitemswithdates: PassengerItem[];
  name: string;
  paxguid: string;
  paxstatus: PaxStatus;
  totalcmprice: number;
  totalfaredifference: number;
  totalflightcredit: number;
  totalflightpenalty: number;
  totalflightprice: number;
  totalhotelpenalty: number;
  totalhotelprice: number;
  totalpenalty: number;
  totalprice: number;
  totalproposedflightcost: number;

  constructor(init?: Partial<PassengerResponse>) {
    Object.assign(this, init, {
      feedetails: init.feedetails ? new FeeDetail(init.feedetails) : null,
      itineraryitemswithdates: _.map(init.itineraryitemswithdates, x => x ? new PassengerItem(x) : null),
      paxstatus: isNaN(init.paxstatus) ? PaxStatus[init.paxstatus] : init.paxstatus,
    });
  }
}

/**
 * Source class: GTA.Common.Models.PassengerSubTotal
 */
export class PassengerSubTotal {
  name: string;
  paxguid: string;
  total: number;
  totalflight: number;
  totalhotel: number;

  constructor(init?: Partial<PassengerSubTotal>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.PassengerTripSummary
 */
export class PassengerTripSummary {
  name: string;
  summaryobjects: ISummaryItem[];

  constructor(init?: Partial<PassengerTripSummary>) {
    Object.assign(this, init, {
      summaryobjects: _.map(init.summaryobjects, x => x ? new ISummaryItem(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Booking.PaxDetails
 */
export class PaxDetails {
  address: string;
  bookingitems: string[];
  city: string;
  country: string;
  dateofbirth: Date;
  email: string;
  firstname: string;
  frequentflyernumber: string;
  gender: Gender;
  givenname: string;
  lastname: string;
  mealpreference: string;
  middlename: string;
  paxguid: string;
  paxmileage?: number;
  paxtype: PaxType;
  pointsprogramid?: number;
  pointsprogramnumber: string;
  postalcode: string;
  primaryphone: string;
  province: string;
  seatpreference: string;
  secondaryphone: string;
  specialrequest: string;
  title: string;

  constructor(init?: Partial<PaxDetails>) {
    Object.assign(this, init, {
      dateofbirth: init.dateofbirth ? new Date(init.dateofbirth) : null,
      gender: isNaN(init.gender) ? Gender[init.gender] : init.gender,
      paxtype: isNaN(init.paxtype) ? PaxType[init.paxtype] : init.paxtype,
    });
  }
}

/**
 * Source class: GTA.Common.Models.PersonNameBase
 */
export class PersonNameBase {
  givenname: string;
  middlename: string;
  nameprefix: string;
  surname: string;

  constructor(init?: Partial<PersonNameBase>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.PhrasePath
 */
export class PhrasePath {
  capacity: number;
  count: number;
  ishandled: boolean;
  isjoinphrase: boolean;
  item: MPPTreeNodeToken;
  phraseactions1: PhraseAction1[];
  phraseactions2: PhraseAction2[];
  sequencenumber: number;
  tobeprocessedinpass: ProcessingPass;

  constructor(init?: Partial<PhrasePath>) {
    Object.assign(this, init, {
      item: init.item ? new MPPTreeNodeToken(init.item) : null,
      phraseactions1: _.map(init.phraseactions1, x => isNaN(x) ? PhraseAction1[x] : x),
      phraseactions2: _.map(init.phraseactions2, x => isNaN(x) ? PhraseAction2[x] : x),
      tobeprocessedinpass: isNaN(init.tobeprocessedinpass) ? ProcessingPass[init.tobeprocessedinpass] : init.tobeprocessedinpass,
    });
  }
}

/**
 * Source class: GTA.Common.Models.PlacesResult
 */
export class PlacesResult {
  address: string;
  guid: string;
  haslodging: boolean;
  haspoi: boolean;
  iconpath: string;
  latitude: number;
  locationstring: string;
  longitude: number;
  name: string;
  openednow: boolean;
  phonenumber: string;
  propertytype: string;
  rating: number;
  timing: string[];
  website: string;

  constructor(init?: Partial<PlacesResult>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.PlacesResultList
 */
export class PlacesResultList {
  response: PlacesResult[];

  constructor(init?: Partial<PlacesResultList>) {
    Object.assign(this, init, {
      response: _.map(init.response, x => x ? new PlacesResult(x) : null),
    });
  }
}

/**
 * Source class: GTA.RankingRules.Models.Policy
 */
export class Policy {
  description: string;
  id: number;
  name: string;
  policyrules: PolicyRule[];
  policytype: RankerType;
  policyusers: PolicyUser[];

  constructor(init?: Partial<Policy>) {
    Object.assign(this, init, {
      policyrules: _.map(init.policyrules, x => x ? new PolicyRule(x) : null),
      policytype: isNaN(init.policytype) ? RankerType[init.policytype] : init.policytype,
      policyusers: _.map(init.policyusers, x => x ? new PolicyUser(x) : null),
    });
  }
}

/**
 * Source class: GTA.RankingRules.Models.PolicyRule
 */
export class PolicyRule {
  id: number;
  operator: PolicyRuleOperatorEnum;
  type: FlightRankingCategory;
  values: PolicyRuleValue[];

  constructor(init?: Partial<PolicyRule>) {
    Object.assign(this, init, {
      operator: isNaN(init.operator) ? PolicyRuleOperatorEnum[init.operator] : init.operator,
      type: isNaN(init.type) ? FlightRankingCategory[init.type] : init.type,
      values: _.map(init.values, x => x ? new PolicyRuleValue(x) : null),
    });
  }
}

/**
 * Source class: GTA.RankingRules.Models.PolicyRuleValue
 */
export class PolicyRuleValue {
  id: number;
  value: string;

  constructor(init?: Partial<PolicyRuleValue>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.RankingRules.Models.PolicyUser
 */
export class PolicyUser {
  id: string;
  policy: Policy;

  constructor(init?: Partial<PolicyUser>) {
    Object.assign(this, init, {
      policy: init.policy ? new Policy(init.policy) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.TravelPreference.PreferenceAttribute
 */
export class PreferenceAttribute {
  description: string;
  id: string;
  name: string;
  rank: number;
  type: string;
  values: PreferenceValue[];

  constructor(init?: Partial<PreferenceAttribute>) {
    Object.assign(this, init, {
      values: _.map(init.values, x => x ? new PreferenceValue(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.TravelPreference.PreferenceCategory
 */
export class PreferenceCategory {
  attributes: PreferenceAttribute[];
  description: string;
  id: string;
  name: string;
  rank: number;
  type: string;

  constructor(init?: Partial<PreferenceCategory>) {
    Object.assign(this, init, {
      attributes: _.map(init.attributes, x => x ? new PreferenceAttribute(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.TravelPreference.PreferenceProfile
 */
export class PreferenceProfile {
  addeddatetime: Date;
  modifieddatetime: Date;
  travelpreferences: PreferenceCategory[];
  travelprofilename: string;
  userprofileid: string;
  usertravelpreferenceprofileid: string;

  constructor(init?: Partial<PreferenceProfile>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      travelpreferences: _.map(init.travelpreferences, x => x ? new PreferenceCategory(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.TravelPreference.PreferenceValue
 */
export class PreferenceValue {
  description: string;
  id: string;
  name: string;
  rank: number;
  type: string;

  constructor(init?: Partial<PreferenceValue>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.PreScanResponse
 */
export class PreScanResponse {
  dontinitiatesearch: boolean;
  nosearch: boolean;
  phraselist: IPhraseReader[];
  query: string;
  scantokens: MultiMap_of_string_and_WordPosition;
  tokenizationlogs: TokenizationLogMessage[];

  constructor(init?: Partial<PreScanResponse>) {
    Object.assign(this, init, {
      phraselist: _.map(init.phraselist, x => x ? new IPhraseReader(x) : null),
      scantokens: init.scantokens ? new MultiMap_of_string_and_WordPosition(init.scantokens) : null,
      tokenizationlogs: _.map(init.tokenizationlogs, x => x ? new TokenizationLogMessage(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Utils.PreScanReviewChunk
 */
export class PreScanReviewChunk {
  atom: string;
  index: number;
  length: number;
  type: PreScanReviewChunkType;

  constructor(init?: Partial<PreScanReviewChunk>) {
    Object.assign(this, init, {
      type: isNaN(init.type) ? PreScanReviewChunkType[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Utils.PreScanReviewChunks
 */
export class PreScanReviewChunks {
  chunks: PreScanReviewChunk[];
  itineraryid: string;
  mentionedairline: string;
  mentionedclass: string;
  mentionedflightnum: string;
  mentionedstops: string;
  query: string;

  constructor(init?: Partial<PreScanReviewChunks>) {
    Object.assign(this, init, {
      chunks: _.map(init.chunks, x => x ? new PreScanReviewChunk(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.PriceTotals
 */
export class PriceTotals {
  passengers: PassengerSubTotal[];
  total: number;

  constructor(init?: Partial<PriceTotals>) {
    Object.assign(this, init, {
      passengers: _.map(init.passengers, x => x ? new PassengerSubTotal(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.MasterData.ProvinceDTO
 */
export class ProvinceDTO {
  countrycode: string;
  provincecode: string;
  provincename: string;

  constructor(init?: Partial<ProvinceDTO>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Reports.RealtimeReportRequest
 */
export class RealtimeReportRequest {
  emailonly: boolean;
  enddatetimeutc: Date;
  skipdateset: boolean;
  startdatetimeutc?: Date;

  constructor(init?: Partial<RealtimeReportRequest>) {
    Object.assign(this, init, {
      enddatetimeutc: init.enddatetimeutc ? new Date(init.enddatetimeutc) : null,
      startdatetimeutc: init.startdatetimeutc ? new Date(init.startdatetimeutc) : null,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.RemoveAgentFromWorkspaceRequest
 */
export class RemoveAgentFromWorkspaceRequest {
  agentid: string;
  workspaceid: number;

  constructor(init?: Partial<RemoveAgentFromWorkspaceRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Agency.RemoveClientFromWorkspaceRequest
 */
export class RemoveClientFromWorkspaceRequest {
  clientid: string;
  workspaceid: number;

  constructor(init?: Partial<RemoveClientFromWorkspaceRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.LoadTester.Common.Shared.StartSimulationRequest+RequestRate
 */
export class RequestRate {
  count: number;
  time: number;

  constructor(init?: Partial<RequestRate>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.ItineraryResponse.ResponseDto
 */
export class ResponseDto {
  cancheckout: boolean;
  conversation: ConversationMessage[];
  currency: string;
  enddatetime?: Date;
  hasbookedversion: boolean;
  isfavorite: boolean;
  isnetworkupdated: boolean;
  items: { [id: string]: IItineraryItemResponse; };
  itinerarystate: ItineraryState;
  needsapproval: boolean;
  notes: string;
  parserunderstanding: string[];
  passengers: PassengerResponse[];
  query: string;
  solutionid: string;
  solutionname: string;
  startdatetime?: Date;
  timedurations?: { [id: string]: string; };
  totalcmprice: number;
  totalfaredifference: number;
  totalhgbfee: number;
  totalpenalty: number;
  totalprice: number;

  constructor(init?: Partial<ResponseDto>) {
    Object.assign(this, init, {
      conversation: _.map(init.conversation, x => x ? new ConversationMessage(x) : null),
      enddatetime: init.enddatetime ? new Date(init.enddatetime) : null,
      items: _.mapValues(init.items, x => {
        let xTypeNum = isNaN(x.type) ? ItineraryItemResponseType[x.type] : x.type;
        if (xTypeNum == ItineraryItemResponseType.flight)
          return new FlightResponseWithLegs(x);
        else if (xTypeNum == ItineraryItemResponseType.hotel)
          return new HotelResponse(x);
        return new IItineraryItemResponse(x);
      }),
      itinerarystate: isNaN(init.itinerarystate) ? ItineraryState[init.itinerarystate] : init.itinerarystate,
      passengers: _.map(init.passengers, x => x ? new PassengerResponse(x) : null),
      startdatetime: init.startdatetime ? new Date(init.startdatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.Role
 */
export class Role {
  actions: Action[];
  addeddatetime: Date;
  description: string;
  modifieddatetime: Date;
  roleid: number;

  constructor(init?: Partial<Role>) {
    Object.assign(this, init, {
      actions: _.map(init.actions, x => x ? new Action(x) : null),
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Itinerary.SearchQueryLog
 */
export class SearchQueryLog {
  addeddatetime: Date;
  ip: string;
  isprocessed: boolean;
  itineraryid?: string;
  logid: number;
  modifieddatetime: Date;
  notes: string;
  phrases: string;
  requestquery: string;
  reviewstatus?: ReviewStatusEnum;
  wern1query: string;
  wern2query: string;
  wernhtmlquery: string;
  wernickeversion: WernickeVersionEnum;

  constructor(init?: Partial<SearchQueryLog>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      reviewstatus: isNaN(init.reviewstatus) ? ReviewStatusEnum[init.reviewstatus] : init.reviewstatus,
      wernickeversion: isNaN(init.wernickeversion) ? WernickeVersionEnum[init.wernickeversion] : init.wernickeversion,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Travel.Seat
 */
export class Seat {
  rownbr: number;
  seatavailabilitycd: string;
  seatavailabilitydesc: string;
  seatdesignations: Designation[];
  seatid: string;
  seatnbr: string;

  constructor(init?: Partial<Seat>) {
    Object.assign(this, init, {
      seatdesignations: _.map(init.seatdesignations, x => x ? new Designation(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Travel.SeatRow
 */
export class SeatRow {
  rowdesignations: Designation[];
  rowidentifier: number;
  seats: Seat[];

  constructor(init?: Partial<SeatRow>) {
    Object.assign(this, init, {
      rowdesignations: _.map(init.rowdesignations, x => x ? new Designation(x) : null),
      seats: _.map(init.seats, x => x ? new Seat(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.SendInvitationRequest
 */
export class SendInvitationRequest {
  email: string;

  constructor(init?: Partial<SendInvitationRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.SessionToken
 */
export class SessionToken {
  addeddatetime: Date;
  devicetype: string;
  deviceuuid: string;
  impersonatinguserprofileid?: string;
  ipaddress: string;
  isanonymous: boolean;
  modifieddatetime: Date;
  token: string;
  userprofile: UserProfile;
  userprofileid: string;

  constructor(init?: Partial<SessionToken>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      userprofile: init.userprofile ? new UserProfile(init.userprofile) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.CardStorage.SessionToken
 */
export class SessionTokenCardStorage {
  accountid: string;
  nickname: string;
  token: string;

  constructor(init?: Partial<SessionTokenCardStorage>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.SetTravelPreferenceRequest
 */
export class SetTravelPreferenceRequest {
  email: string;
  travelpreferenceprofileid: string;

  constructor(init?: Partial<SetTravelPreferenceRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Itinerary.SolutionRequest
 */
export class SolutionRequest {
  isfavorite?: boolean;
  name: string;

  constructor(init?: Partial<SolutionRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.LoadTester.Common.Shared.StartSimulationRequest
 */
export class StartSimulationRequest {
  agentapprovaldelayinseconds: number;
  complexities: { [id: string]: number; };
  modalities: { [id: string]: number; };
  qaapprovaldelayinseconds: number;
  rate: RequestRate;

  constructor(init?: Partial<StartSimulationRequest>) {
    Object.assign(this, init, {
      rate: init.rate ? new RequestRate(init.rate) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Web.Controllers.StatusResponses
 */
export class StatusResponses {
  

  constructor(init?: Partial<StatusResponses>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.StubUserProfile
 */
export class StubUserProfile {
  addeddatetime: Date;
  address: string;
  city: string;
  country: string;
  dob?: Date;
  emailaddress: string;
  firstname: string;
  fullname: string;
  gender: Gender;
  lastname: string;
  middlename: string;
  modifieddatetime: Date;
  phone: string;
  postalcode: string;
  state: string;
  title: string;
  userprofileid: string;

  constructor(init?: Partial<StubUserProfile>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      dob: init.dob ? new Date(init.dob) : null,
      gender: isNaN(init.gender) ? Gender[init.gender] : init.gender,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.LoadTester.Common.Shared.SystemStatus
 */
export class SystemStatus {
  agentcount: number;
  clientcount: number;
  emailserviceready: boolean;
  istestexecutionrunning: boolean;
  qacount: number;
  smsserviceready: boolean;
  systemready: boolean;
  totalsent: number;
  usersready: boolean;

  constructor(init?: Partial<SystemStatus>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.TestNetworkResult
 */
export class TestNetworkResult {
  itineraryid: string;
  messages: string;
  nodecount: number;
  nodes: tNode[];
  phrases: string[];
  response: string;
  tokens: string;

  constructor(init?: Partial<TestNetworkResult>) {
    Object.assign(this, init, {
      nodes: _.map(init.nodes, x => x ? new tNode(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.TimeRange
 */
export class TimeRange {
  action: DateTimeAction;
  end: ParserTime;
  start: ParserTime;

  constructor(init?: Partial<TimeRange>) {
    Object.assign(this, init, {
      action: isNaN(init.action) ? DateTimeAction[init.action] : init.action,
      end: init.end ? new ParserTime(init.end) : null,
      start: init.start ? new ParserTime(init.start) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.tNode
 */
export class tNode {
  attributes: MultiMap_of_string_and_string;
  destinationname: string;
  earlyfinish: Date;
  earlystart: Date;
  isdummy: boolean;
  isoptional: boolean;
  isupdated: boolean;
  latestfinish: Date;
  length: number;
  minorpaxlist: IPax[];
  nodetype: NodeType;
  parentnode: number;
  pax: IPax;
  removedattributes: MultiMap_of_string_and_string;
  requesteddate: ParserDate;
  requestedtime: ParserTime;
  scheduledfinish: Date;
  scheduledstart: Date;

  constructor(init?: Partial<tNode>) {
    Object.assign(this, init, {
      attributes: init.attributes ? new MultiMap_of_string_and_string(init.attributes) : null,
      earlyfinish: init.earlyfinish ? new Date(init.earlyfinish) : null,
      earlystart: init.earlystart ? new Date(init.earlystart) : null,
      latestfinish: init.latestfinish ? new Date(init.latestfinish) : null,
      minorpaxlist: _.map(init.minorpaxlist, x => x ? new IPax(x) : null),
      nodetype: isNaN(init.nodetype) ? NodeType[init.nodetype] : init.nodetype,
      pax: init.pax ? new IPax(init.pax) : null,
      removedattributes: init.removedattributes ? new MultiMap_of_string_and_string(init.removedattributes) : null,
      requesteddate: init.requesteddate ? new ParserDate(init.requesteddate) : null,
      requestedtime: init.requestedtime ? new ParserTime(init.requestedtime) : null,
      scheduledfinish: init.scheduledfinish ? new Date(init.scheduledfinish) : null,
      scheduledstart: init.scheduledstart ? new Date(init.scheduledstart) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.TokenizationLogMessage
 */
export class TokenizationLogMessage {
  gtatokens: GTAToken[];
  message: string;
  mpptokens: MPPTreeNodeToken[];
  type: TokenizationLogMessageType;

  constructor(init?: Partial<TokenizationLogMessage>) {
    Object.assign(this, init, {
      gtatokens: _.map(init.gtatokens, x => x ? new GTAToken(x) : null),
      mpptokens: _.map(init.mpptokens, x => x ? new MPPTreeNodeToken(x) : null),
      type: isNaN(init.type) ? TokenizationLogMessageType[init.type] : init.type,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AgentDesk.TransactionDto
 */
export class TransactionDto {
  agentemailaddress: string;
  agentid?: string;
  channel: AgentDeskChannel;
  content: string;
  lastitinerary: ItineraryDto;
  lastupdate: Date;
  priority: number;
  receivingaddress: string;
  transactionid: number;
  transactionstate: TransactionState;
  useremail: string;
  userid?: string;

  constructor(init?: Partial<TransactionDto>) {
    Object.assign(this, init, {
      channel: isNaN(init.channel) ? AgentDeskChannel[init.channel] : init.channel,
      lastitinerary: init.lastitinerary ? new ItineraryDto(init.lastitinerary) : null,
      lastupdate: init.lastupdate ? new Date(init.lastupdate) : null,
      transactionstate: isNaN(init.transactionstate) ? TransactionState[init.transactionstate] : init.transactionstate,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AirlinePointsProgram.TravelerAirlinePointsProgramResponse
 */
export class TravelerAirlinePointsProgramResponse {
  firstname: string;
  lastname: string;
  programid: number;
  programname: string;
  programnumber: string;
  userprofileid: string;

  constructor(init?: Partial<TravelerAirlinePointsProgramResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UserProfileBaseResponse
 */
export class UserProfileBaseResponse {
  avatarurl: string;
  firstname: string;
  lastname: string;
  middlename: string;
  username: string;
  userprofileid: string;

  constructor(init?: Partial<UserProfileBaseResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.TravelPreference.TravelPreferenceProfileRequest
 */
export class TravelPreferenceProfileRequest {
  defaultprofileid?: number;
  profilename: string;

  constructor(init?: Partial<TravelPreferenceProfileRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.TravelPreference.TravelPreferenceResponse
 */
export class TravelPreferenceResponse {
  id?: string;
  profilename: string;

  constructor(init?: Partial<TravelPreferenceResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.ApplicationServices.Models.MasterData.TravelPreferenceValueResponse
 */
export class TravelPreferenceValueResponse {
  description: string;
  id: string;
  name: string;

  constructor(init?: Partial<TravelPreferenceValueResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.TripSummary
 */
export class TripSummary {
  subtotal: number;
  summaryobjects: PassengerTripSummary[];
  taxandsearchcharges: number;
  triptotal: number;

  constructor(init?: Partial<TripSummary>) {
    Object.assign(this, init, {
      summaryobjects: _.map(init.summaryobjects, x => x ? new PassengerTripSummary(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.UpdateAvailabilityFlightResponse
 */
export class UpdateAvailabilityFlightResponse {
  basefare: number;
  conversationhint: ConversationHint[];
  flightid: string;
  gst: number;
  hst: number;
  isavailable: boolean;
  ischildflight: boolean;
  message: string;
  supportedcards: PaymentCardType[];
  taxbreakdown: { [id: string]: number; };
  totalamount: number;
  totaltax: number;

  constructor(init?: Partial<UpdateAvailabilityFlightResponse>) {
    Object.assign(this, init, {
      conversationhint: _.map(init.conversationhint, x => x ? new ConversationHint(x) : null),
      supportedcards: _.map(init.supportedcards, x => isNaN(x) ? PaymentCardType[x] : x),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.UpdateAvailabilityHotelResponse
 */
export class UpdateAvailabilityHotelResponse {
  averagerate: number;
  averagerateusd: number;
  basefare: number;
  basefareusd: number;
  conversationhint: ConversationHint[];
  cost: number;
  costusd: number;
  hotelid: string;
  isavailable: boolean;
  message: string;
  nightlyrate: number[];
  nightlyrateusd: number[];
  supportedcards: PaymentCardType[];
  surchargetotal: number;
  surchargetotalusd: number;
  taxbreakdown: { [id: string]: string; };

  constructor(init?: Partial<UpdateAvailabilityHotelResponse>) {
    Object.assign(this, init, {
      conversationhint: _.map(init.conversationhint, x => x ? new ConversationHint(x) : null),
      supportedcards: _.map(init.supportedcards, x => isNaN(x) ? PaymentCardType[x] : x),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.Travel.UpdateAvailablilityResponse
 */
export class UpdateAvailablilityResponse {
  flights: UpdateAvailabilityFlightResponse[];
  hotels: UpdateAvailabilityHotelResponse[];

  constructor(init?: Partial<UpdateAvailablilityResponse>) {
    Object.assign(this, init, {
      flights: _.map(init.flights, x => x ? new UpdateAvailabilityFlightResponse(x) : null),
      hotels: _.map(init.hotels, x => x ? new UpdateAvailabilityHotelResponse(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AgentDesk.Request.UpdateItineraryAgentRequest
 */
export class UpdateItineraryAgentRequest {
  agentnotes: string;
  complexity: Complexity;
  ispreapproved: boolean;
  itineraryid: string;
  newstate: ItineraryState;
  notificationchannels: AgentDeskChannel[];

  constructor(init?: Partial<UpdateItineraryAgentRequest>) {
    Object.assign(this, init, {
      complexity: isNaN(init.complexity) ? Complexity[init.complexity] : init.complexity,
      newstate: isNaN(init.newstate) ? ItineraryState[init.newstate] : init.newstate,
      notificationchannels: _.map(init.notificationchannels, x => isNaN(x) ? AgentDeskChannel[x] : x),
    });
  }
}

/**
 * Source class: GTA.Common.Models.UpdateTicketInfoRequest
 */
export class UpdateTicketInfoRequest {
  bookingid: string;

  constructor(init?: Partial<UpdateTicketInfoRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UpdateUserProfileRequest
 */
export class UpdateUserProfileRequest {
  address: string;
  city: string;
  country: string;
  dob: string;
  firstname: string;
  gender: Gender;
  isprofilepublic: boolean;
  lastname: string;
  middlename: string;
  phone: string;
  postalcode: string;
  sendemailinvoice: boolean;
  state: string;
  title: string;

  constructor(init?: Partial<UpdateUserProfileRequest>) {
    Object.assign(this, init, {
      gender: isNaN(init.gender) ? Gender[init.gender] : init.gender,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UpdateUserTypeRequest
 */
export class UpdateUserTypeRequest {
  carddetail: CardToken;
  nextusertypeid: UserTypeEnum;

  constructor(init?: Partial<UpdateUserTypeRequest>) {
    Object.assign(this, init, {
      carddetail: init.carddetail ? new CardToken(init.carddetail) : null,
      nextusertypeid: isNaN(init.nextusertypeid) ? UserTypeEnum[init.nextusertypeid] : init.nextusertypeid,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.UserAddress
 */
export class UserAddress {
  addeddatetime: Date;
  addresslineone: string;
  addresslinetwo: string;
  addresstype: AddressType;
  city: string;
  country: string;
  email: string;
  isdefault: boolean;
  modifieddatetime: Date;
  phone: string;
  postalcode: string;
  state: string;
  useraddressid: number;
  userprofileid: string;

  constructor(init?: Partial<UserAddress>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      addresstype: init.addresstype ? new AddressType(init.addresstype) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.UserDevice
 */
export class UserDevice {
  addeddatetime: Date;
  applicationversion: string;
  deviceuuid: string;
  isactive: boolean;
  modifieddatetime: Date;
  notificationbadgecount: number;
  notificationtoken: string;
  operatingsystem: string;
  operatingsystemversion: string;
  owner: UserProfile;
  userdeviceid: number;
  userprofileid: string;

  constructor(init?: Partial<UserDevice>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      owner: init.owner ? new UserProfile(init.owner) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Groups.UserGroup
 */
export class UserGroup {
  addeddatetime: Date;
  adminid: string;
  description: string;
  isactive: boolean;
  modifieddatetime: Date;
  name: string;
  usergroupid: number;

  constructor(init?: Partial<UserGroup>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Groups.UserGroupMember
 */
export class UserGroupMember {
  addeddatetime: Date;
  emailaddress: string;
  isactive: boolean;
  modifieddatetime: Date;
  status: GroupMemberStatus;
  usergroupmemberid: number;
  userprofileid?: string;

  constructor(init?: Partial<UserGroupMember>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      status: isNaN(init.status) ? GroupMemberStatus[init.status] : init.status,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Controllers.UserGroupRequest
 */
export class UserGroupRequest {
  description: string;
  name: string;

  constructor(init?: Partial<UserGroupRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UserImageRequest
 */
export class UserImageRequest {
  avatar: number[];
  mimetype: string;
  userprofileid: string;

  constructor(init?: Partial<UserImageRequest>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UserImageResponse
 */
export class UserImageResponse {
  avatarurl: string;
  userprofileid: string;

  constructor(init?: Partial<UserImageResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UserInvoiceResponse
 */
export class UserInvoiceResponse {
  amountpaid: string;
  currency: string;
  enddate: string;
  invoiceid: string;
  invoicestatus: string;
  startdate: string;

  constructor(init?: Partial<UserInvoiceResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UserLoginResponse
 */
export class UserLoginResponse {
  email: string;
  travelpreferenceprofile: TravelPreferenceResponse;

  constructor(init?: Partial<UserLoginResponse>) {
    Object.assign(this, init, {
      travelpreferenceprofile: init.travelpreferenceprofile ? new TravelPreferenceResponse(init.travelpreferenceprofile) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.UserProfile
 */
export class UserProfile {
  accepthgbmarketing: boolean;
  acceptthirdpartymarketing: boolean;
  activationtoken: string;
  activeitinerary?: string;
  addeddatetime: Date;
  address: string;
  addresses: UserAddress[];
  agency: Agency;
  agencycode: string;
  attempts: number;
  avatarurl: string;
  bookingattempts: number;
  cellphone: string;
  city: string;
  country: string;
  culturecode: string;
  currentusertype: UserType;
  currentusertypeid: UserTypeEnum;
  devices: UserDevice[];
  dob?: Date;
  emailaddress: string;
  firstname: string;
  fullname: string;
  gender: Gender;
  gracedate?: Date;
  ipaddress: string;
  isactive: boolean;
  isanonymous: boolean;
  isprofilepublic: boolean;
  istravelprofile: boolean;
  language?: NaturalLanguage;
  lastname: string;
  marketingtravelertype?: MarketingTravelerType;
  middlename: string;
  modifieddatetime: Date;
  nextbillingdate?: Date;
  nextusertype: UserType;
  nextusertypeid?: UserTypeEnum;
  passwordhash: string;
  phone: string;
  postalcode: string;
  requesteddatetime?: Date;
  role: Role;
  roleid: RoleType;
  sendemailinvoice: boolean;
  state: string;
  title: string;
  travelpreferenceprofileid?: string;
  typehistory: UserTypeHistory[];
  userprofileid: string;

  constructor(init?: Partial<UserProfile>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      addresses: _.map(init.addresses, x => x ? new UserAddress(x) : null),
      agency: init.agency ? new Agency(init.agency) : null,
      currentusertype: init.currentusertype ? new UserType(init.currentusertype) : null,
      currentusertypeid: isNaN(init.currentusertypeid) ? UserTypeEnum[init.currentusertypeid] : init.currentusertypeid,
      devices: _.map(init.devices, x => x ? new UserDevice(x) : null),
      dob: init.dob ? new Date(init.dob) : null,
      gender: isNaN(init.gender) ? Gender[init.gender] : init.gender,
      gracedate: init.gracedate ? new Date(init.gracedate) : null,
      language: isNaN(init.language) ? NaturalLanguage[init.language] : init.language,
      marketingtravelertype: isNaN(init.marketingtravelertype) ? MarketingTravelerType[init.marketingtravelertype] : init.marketingtravelertype,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      nextbillingdate: init.nextbillingdate ? new Date(init.nextbillingdate) : null,
      nextusertype: init.nextusertype ? new UserType(init.nextusertype) : null,
      nextusertypeid: isNaN(init.nextusertypeid) ? UserTypeEnum[init.nextusertypeid] : init.nextusertypeid,
      requesteddatetime: init.requesteddatetime ? new Date(init.requesteddatetime) : null,
      role: init.role ? new Role(init.role) : null,
      roleid: isNaN(init.roleid) ? RoleType[init.roleid] : init.roleid,
      typehistory: _.map(init.typehistory, x => x ? new UserTypeHistory(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UserProfileResponse
 */
export class UserProfileResponse extends UserProfileBaseResponse {
  address: string;
  agencycode: string;
  city: string;
  country: string;
  currency: string;
  dob?: Date;
  emailaddress: string;
  gender: string;
  impersonatedby: UserProfileBaseResponse;
  ispremiumuser: boolean;
  isprofilepublic: boolean;
  istravelprofile: boolean;
  nextbillingamount: string;
  nextbillingdate?: Date;
  nextusertype?: UserTypeEnum;
  phone: string;
  postalcode: string;
  role: RoleType;
  sendemailinvoice: boolean;
  state: string;
  title: string;
  usergroup: UserGroup;
  usertype: UserTypeEnum;
  usertypehistory: UserTypeHistoryResponse[];

  constructor(init?: Partial<UserProfileResponse>) {
    super(init);
    Object.assign(this, {
      dob: init.dob ? new Date(init.dob) : null,
      impersonatedby: init.impersonatedby ? new UserProfileBaseResponse(init.impersonatedby) : null,
      nextbillingdate: init.nextbillingdate ? new Date(init.nextbillingdate) : null,
      nextusertype: isNaN(init.nextusertype) ? UserTypeEnum[init.nextusertype] : init.nextusertype,
      role: isNaN(init.role) ? RoleType[init.role] : init.role,
      usergroup: init.usergroup ? new UserGroup(init.usergroup) : null,
      usertype: isNaN(init.usertype) ? UserTypeEnum[init.usertype] : init.usertype,
      usertypehistory: _.map(init.usertypehistory, x => x ? new UserTypeHistoryResponse(x) : null),
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.TravelerResponse
 */
export class TravelerResponse extends UserProfileResponse {
  paxid: string;
  validpointsprograms: TravelerAirlinePointsProgramResponse[];

  constructor(init?: Partial<TravelerResponse>) {
    super(init);
    Object.assign(this, {
      validpointsprograms: _.map(init.validpointsprograms, x => x ? new TravelerAirlinePointsProgramResponse(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.UserType
 */
export class UserType {
  addeddatetime: Date;
  attributes: UserTypeAttributes[];
  benefits: UserTypeBenefits[];
  description: string;
  isgroupadmin: boolean;
  isgroupmember: boolean;
  ispaidsubscriber: boolean;
  isselectable: boolean;
  modifieddatetime: Date;
  usertypeid: UserTypeEnum;

  constructor(init?: Partial<UserType>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      attributes: _.map(init.attributes, x => x ? new UserTypeAttributes(x) : null),
      benefits: _.map(init.benefits, x => x ? new UserTypeBenefits(x) : null),
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      usertypeid: isNaN(init.usertypeid) ? UserTypeEnum[init.usertypeid] : init.usertypeid,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.UserTypeAttributes
 */
export class UserTypeAttributes {
  addeddatetime: Date;
  changefee: number;
  discount: Discount;
  discountcode: string;
  enddate?: Date;
  isactive: boolean;
  itineraryfee: number;
  maxallowedusers: number;
  maxpaxperitinerary: number;
  modifieddatetime: Date;
  monthlyfee: number;
  startdate: Date;
  usertypeattributeid: number;
  usertypeid: UserTypeEnum;

  constructor(init?: Partial<UserTypeAttributes>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      discount: init.discount ? new Discount(init.discount) : null,
      enddate: init.enddate ? new Date(init.enddate) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      startdate: init.startdate ? new Date(init.startdate) : null,
      usertypeid: isNaN(init.usertypeid) ? UserTypeEnum[init.usertypeid] : init.usertypeid,
    });
  }
}

/**
 * Source class: GTA.Common.Models.MasterData.UserTypeBenefits
 */
export class UserTypeBenefits {
  addeddatetime: Date;
  displayorder: number;
  messageid: string;
  modifieddatetime: Date;
  supported: boolean;
  usertypebenefitid: number;
  usertypeid: string;

  constructor(init?: Partial<UserTypeBenefits>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Users.UserTypeHistory
 */
export class UserTypeHistory {
  addeddatetime: Date;
  modifieddatetime: Date;
  requesteddatetime: Date;
  startdate: Date;
  userprofileid: string;
  usertypehistoryid: number;
  usertypeid: UserTypeEnum;

  constructor(init?: Partial<UserTypeHistory>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      requesteddatetime: init.requesteddatetime ? new Date(init.requesteddatetime) : null,
      startdate: init.startdate ? new Date(init.startdate) : null,
      usertypeid: isNaN(init.usertypeid) ? UserTypeEnum[init.usertypeid] : init.usertypeid,
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.UserProfile.UserTypeHistoryResponse
 */
export class UserTypeHistoryResponse {
  enddate?: Date;
  requesteddate?: Date;
  startdate?: Date;
  usertype: UserTypeEnum;

  constructor(init?: Partial<UserTypeHistoryResponse>) {
    Object.assign(this, init, {
      enddate: init.enddate ? new Date(init.enddate) : null,
      requesteddate: init.requesteddate ? new Date(init.requesteddate) : null,
      startdate: init.startdate ? new Date(init.startdate) : null,
      usertype: isNaN(init.usertype) ? UserTypeEnum[init.usertype] : init.usertype,
    });
  }
}

/**
 * Source class: System.Collections.Generic.Dictionary`2+ValueCollection[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.Collections.Generic.List`1[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
 */
export class ValueCollection_of_string_and_List_of_string {
  count: number;

  constructor(init?: Partial<ValueCollection_of_string_and_List_of_string>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: System.Collections.Generic.Dictionary`2+ValueCollection[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.Collections.Generic.List`1[[GTA.Common.Models.Parser.WordPosition, GTA.Common, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
 */
export class ValueCollection_of_string_and_List_of_WordPosition {
  count: number;

  constructor(init?: Partial<ValueCollection_of_string_and_List_of_WordPosition>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.Visualization.VisualizationResponse
 */
export class VisualizationResponse {
  edges: edge[];
  nodes: node[];

  constructor(init?: Partial<VisualizationResponse>) {
    Object.assign(this, init, {
      edges: _.map(init.edges, x => x ? new edge(x) : null),
      nodes: _.map(init.nodes, x => x ? new node(x) : null),
    });
  }
}

/**
 * Source class: GTA.Common.Models.Wernicke.WernickeEmail
 */
export class WernickeEmail {
  addeddatetime: Date;
  answertype: WernickeAnswerType;
  emailbody: string;
  emailid: number;
  filename: string;
  incidentid: number;
  modifieddatetime: Date;
  network: string;
  networkmodified: Date;
  networkstate: number;
  nupdateby: string;
  wern: string;
  wernmodified: Date;
  wernpost: string;
  wernpostmodified: Date;
  wernpoststate: number;
  wernstate: number;
  wpupdateby: string;
  wupdateby: string;

  constructor(init?: Partial<WernickeEmail>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      answertype: isNaN(init.answertype) ? WernickeAnswerType[init.answertype] : init.answertype,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
      networkmodified: init.networkmodified ? new Date(init.networkmodified) : null,
      wernmodified: init.wernmodified ? new Date(init.wernmodified) : null,
      wernpostmodified: init.wernpostmodified ? new Date(init.wernpostmodified) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Wernicke.WernickeEmailChartData
 */
export class WernickeEmailChartData {
  addeddatetime: Date;
  batchid: number;
  modifieddatetime: Date;
  pfailednew: number;
  pfailedunchanged: number;
  ppassednew: number;
  ppassedunchanged: number;
  punanswered: number;
  pundecided: number;
  testid: number;
  tppassednew: number;
  tppfailednew: number;
  tppfailedunchanged: number;
  tpppassedunchanged: number;
  tppunanswered: number;
  tppundecided: number;
  wfailednew: number;
  wfailedunchanged: number;
  wpassednew: number;
  wpassedunchanged: number;
  wpfailednew: number;
  wpfailedunchanged: number;
  wppassednew: number;
  wppassedunchanged: number;
  wppfailednew: number;
  wppfailedunchanged: number;
  wpppassednew: number;
  wpppassedunchanged: number;
  wppunanswered: number;
  wppundecided: number;
  wpunanswered: number;
  wpundecided: number;
  wunanswered: number;
  wundecided: number;

  constructor(init?: Partial<WernickeEmailChartData>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Wernicke.WernickeEmailTestResult
 */
export class WernickeEmailTestResult {
  answer: WernickeTestAnswer;
  email: WernickeEmail;
  result: WernickeTestResult;

  constructor(init?: Partial<WernickeEmailTestResult>) {
    Object.assign(this, init, {
      answer: init.answer ? new WernickeTestAnswer(init.answer) : null,
      email: init.email ? new WernickeEmail(init.email) : null,
      result: init.result ? new WernickeTestResult(init.result) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Wernicke.WernickeResponse
 */
export class WernickeResponse {
  

  constructor(init?: Partial<WernickeResponse>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Wernicke.WernickeTestAnswer
 */
export class WernickeTestAnswer extends WernickeEmail {
  batchid: number;
  testid: number;

  constructor(init?: Partial<WernickeTestAnswer>) {
    super(init);
    Object.assign(this, {
    });
  }
}

/**
 * Source class: GTA.Common.Models.Wernicke.WernickeTestResult
 */
export class WernickeTestResult {
  addeddatetime: Date;
  batchid: number;
  emailid: number;
  incidentid: number;
  modifieddatetime: Date;
  network: string;
  networkresult: number;
  parser: string;
  parserresult: number;
  testid: number;
  transparser: string;
  transparserresult: number;
  wern: string;
  wernpost: string;
  wernpostresult: number;
  wernresult: number;

  constructor(init?: Partial<WernickeTestResult>) {
    Object.assign(this, init, {
      addeddatetime: init.addeddatetime ? new Date(init.addeddatetime) : null,
      modifieddatetime: init.modifieddatetime ? new Date(init.modifieddatetime) : null,
    });
  }
}

/**
 * Source class: GTA.Common.Models.Parser.WordPosition
 */
export class WordPosition {
  end: number;
  isplural: boolean;
  matchedword: string;
  needtoreplaceword: boolean;
  start: number;

  constructor(init?: Partial<WordPosition>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AgentDesk.WorkspaceDto
 */
export class WorkspaceDto {
  agencycode: string;
  clientprofilename: string;
  workspaceid: number;

  constructor(init?: Partial<WorkspaceDto>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: GTARESTServices.Web.Api.Models.AgentDesk.WorkspaceTransactionDto
 */
export class WorkspaceTransactionDto {
  transactionid: number;
  workspaceid: number;

  constructor(init?: Partial<WorkspaceTransactionDto>) {
    Object.assign(this, init, {
    });
  }
}
//========================================================================================

// FROM:  https://github.com/damienbod/angular-auth-oidc-client/blob/master/src/services/uri-encoder.ts
export class UriEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

/**
 * This is a utility class to avoid adding 'null' or 'undefined' to HttpParams,
 * which unfortunatelly happens when calling e.g. HttpParams.set('key', null)
 */
class HttpParamsBuilder {
  private p: HttpParams;
  constructor() {
    this.p = new HttpParams({ encoder: new UriEncoder() }); // LESSON: HttpUrlEncodingCodec does not work, as it massages the string after encodeURIComponent() and converts %2B back to "+". See Angular source code: https://github.com/angular/angular/blob/c8a1a14b87e5907458e8e87021e47f9796cb3257/packages/common/http/src/params.ts#L64
  }
  set(key: string, value: string): HttpParamsBuilder {
    if (value != undefined && value != null)
      this.p = this.p.set(key, value);
    return this;
  }
  setAsStr(key: string, value: any): HttpParamsBuilder {
    if (value != undefined && value != null)
      this.p = this.p.set(key, `${value}`);
    return this;
  }
  toHttpParams(): HttpParams {
    return this.p;
  }
}

/**
 * An extension of the standard Response class, adding an error field
 */
export interface HttpResponse extends Response {
  error: any;
}

export const GTARestService_apiUrl = new InjectionToken<string>('GTARestService-ApiUrl');
export function GTARestService_makeRootProviders(apiUrl: string): Provider[] {
  return [
    {
      provide: GTARestService_apiUrl,
      useValue: apiUrl,
      multi: true
    },
    GTARestService
  ];
}

@Injectable()
export class GTARestService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    @Inject(GTARestService_apiUrl)
    private apiUrlPrefix: string,
    private http: HttpClient
  ) { }

  /**
   * 
   * URL: POST REST/Admin/AssignRoleToUser
   * ID: POST-REST-Admin-AssignRoleToUser
   * HttpMethod: post
   * UrlFull: REST/Admin/AssignRoleToUser
   * UrlVar:  Admin/AssignRoleToUser
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - request:AssignRoleToUserRequest:required
   */
  public Admin_AssignRoleToUser(request: AssignRoleToUserRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Admin/AssignRoleToUser`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Admin/GetUsersWithoutAgency/{query}
   * ID: GET-REST-Admin-GetUsersWithoutAgency-query
   * HttpMethod: get
   * UrlFull: REST/Admin/GetUsersWithoutAgency/{query}
   * UrlVar:  Admin/GetUsersWithoutAgency
   * ResponseType: GetUserResponse[]
   * UriParams:
   * - query:string:optional
   * BodyParams:
   */
  public Admin_GetUsersWithoutAgency(query?: string)
    : Promise<GetUserResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('query', query)
        .toHttpParams()
    };
    return this.http
      .get<GetUserResponse[]>(`${this.apiUrlPrefix}/Admin/GetUsersWithoutAgency`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new GetUserResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Agency/AssignAgentToWorkspace
   * ID: POST-REST-Agency-AssignAgentToWorkspace
   * HttpMethod: post
   * UrlFull: REST/Agency/AssignAgentToWorkspace
   * UrlVar:  Agency/AssignAgentToWorkspace
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - request:AssignAgentToWorkspaceRequest:required
   */
  public Agency_AssignAgentToWorkspace(request: AssignAgentToWorkspaceRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Agency/AssignAgentToWorkspace`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Agency/AssignClientToWorkspace
   * ID: POST-REST-Agency-AssignClientToWorkspace
   * HttpMethod: post
   * UrlFull: REST/Agency/AssignClientToWorkspace
   * UrlVar:  Agency/AssignClientToWorkspace
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - request:AssignClientToWorkspaceRequest:required
   */
  public Agency_AssignClientToWorkspace(request: AssignClientToWorkspaceRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Agency/AssignClientToWorkspace`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Agency
   * ID: POST-REST-Agency
   * HttpMethod: post
   * UrlFull: REST/Agency
   * UrlVar:  Agency
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - request:CreateAgencyRequest:required
   */
  public Agency_CreateAgency(request: CreateAgencyRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Agency`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Agency/CreateWorkspace
   * ID: POST-REST-Agency-CreateWorkspace
   * HttpMethod: post
   * UrlFull: REST/Agency/CreateWorkspace
   * UrlVar:  Agency/CreateWorkspace
   * ResponseType: WorkspaceDto
   * UriParams:
   * BodyParams:
   * - request:NewWorkspaceRequest:required
   */
  public Agency_CreateWorkspace(request: NewWorkspaceRequest)
    : Promise<WorkspaceDto>
  {
    let options = { headers: this.headers };
    return this.http
      .post<WorkspaceDto>(`${this.apiUrlPrefix}/Agency/CreateWorkspace`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new WorkspaceDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Agency
   * ID: GET-REST-Agency
   * HttpMethod: get
   * UrlFull: REST/Agency
   * UrlVar:  Agency
   * ResponseType: AgencyDto[]
   * UriParams:
   * BodyParams:
   */
  public Agency_GetAgencies()
    : Promise<AgencyDto[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<AgencyDto[]>(`${this.apiUrlPrefix}/Agency`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new AgencyDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Agency/Users
   * ID: GET-REST-Agency-Users
   * HttpMethod: get
   * UrlFull: REST/Agency/Users
   * UrlVar:  Agency/Users
   * ResponseType: GetUserResponse[]
   * UriParams:
   * BodyParams:
   */
  public Agency_GetAgencyUser()
    : Promise<GetUserResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<GetUserResponse[]>(`${this.apiUrlPrefix}/Agency/Users`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new GetUserResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Agency/GetAgencyWorkspace?agencyCode={agencyCode}
   * ID: GET-REST-Agency-GetAgencyWorkspace_agencyCode
   * HttpMethod: get
   * UrlFull: REST/Agency/GetAgencyWorkspace?agencyCode={agencyCode}
   * UrlVar:  Agency/GetAgencyWorkspace
   * ResponseType: WorkspaceDto[]
   * UriParams:
   * - agencyCode:string:required
   * BodyParams:
   */
  public Agency_GetAgencyWorkspace(agencyCode: string)
    : Promise<WorkspaceDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('agencyCode', agencyCode)
        .toHttpParams()
    };
    return this.http
      .get<WorkspaceDto[]>(`${this.apiUrlPrefix}/Agency/GetAgencyWorkspace`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new WorkspaceDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Agency/Agents?agencyCode={agencyCode}
   * ID: GET-REST-Agency-Agents_agencyCode
   * HttpMethod: get
   * UrlFull: REST/Agency/Agents?agencyCode={agencyCode}
   * UrlVar:  Agency/Agents
   * ResponseType: GetUserResponse[]
   * UriParams:
   * - agencyCode:string:optional
   * BodyParams:
   */
  public Agency_GetAgents(agencyCode?: string)
    : Promise<GetUserResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('agencyCode', agencyCode)
        .toHttpParams()
    };
    return this.http
      .get<GetUserResponse[]>(`${this.apiUrlPrefix}/Agency/Agents`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new GetUserResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Agency/GetAgentsFromWorkspace?workspaceId={workspaceId}
   * ID: GET-REST-Agency-GetAgentsFromWorkspace_workspaceId
   * HttpMethod: get
   * UrlFull: REST/Agency/GetAgentsFromWorkspace?workspaceId={workspaceId}
   * UrlVar:  Agency/GetAgentsFromWorkspace
   * ResponseType: GetUserResponse[]
   * UriParams:
   * - workspaceId:number:required
   * BodyParams:
   */
  public Agency_GetAgentsFromWorkspace(workspaceId: number)
    : Promise<GetUserResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('workspaceId', workspaceId)
        .toHttpParams()
    };
    return this.http
      .get<GetUserResponse[]>(`${this.apiUrlPrefix}/Agency/GetAgentsFromWorkspace`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new GetUserResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Agency/GetAgentWorkspace?agentId={agentId}
   * ID: GET-REST-Agency-GetAgentWorkspace_agentId
   * HttpMethod: get
   * UrlFull: REST/Agency/GetAgentWorkspace?agentId={agentId}
   * UrlVar:  Agency/GetAgentWorkspace
   * ResponseType: WorkspaceDto[]
   * UriParams:
   * - agentId:string:required
   * BodyParams:
   */
  public Agency_GetAgentWorkspace(agentId: string)
    : Promise<WorkspaceDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('agentId', agentId)
        .toHttpParams()
    };
    return this.http
      .get<WorkspaceDto[]>(`${this.apiUrlPrefix}/Agency/GetAgentWorkspace`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new WorkspaceDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Agency/GetClientUsersFromWorkspace?workspaceId={workspaceId}
   * ID: GET-REST-Agency-GetClientUsersFromWorkspace_workspaceId
   * HttpMethod: get
   * UrlFull: REST/Agency/GetClientUsersFromWorkspace?workspaceId={workspaceId}
   * UrlVar:  Agency/GetClientUsersFromWorkspace
   * ResponseType: GetUserResponse[]
   * UriParams:
   * - workspaceId:number:optional
   * BodyParams:
   */
  public Agency_GetClientUsersFromWorkspace(workspaceId?: number)
    : Promise<GetUserResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('workspaceId', workspaceId)
        .toHttpParams()
    };
    return this.http
      .get<GetUserResponse[]>(`${this.apiUrlPrefix}/Agency/GetClientUsersFromWorkspace`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new GetUserResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Agency/RemoveAgentFromWorkspace
   * ID: POST-REST-Agency-RemoveAgentFromWorkspace
   * HttpMethod: post
   * UrlFull: REST/Agency/RemoveAgentFromWorkspace
   * UrlVar:  Agency/RemoveAgentFromWorkspace
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - request:RemoveAgentFromWorkspaceRequest:required
   */
  public Agency_RemoveAgentFromWorkspace(request: RemoveAgentFromWorkspaceRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Agency/RemoveAgentFromWorkspace`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Agency/RemoveClientFromWorkspace
   * ID: POST-REST-Agency-RemoveClientFromWorkspace
   * HttpMethod: post
   * UrlFull: REST/Agency/RemoveClientFromWorkspace
   * UrlVar:  Agency/RemoveClientFromWorkspace
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - request:RemoveClientFromWorkspaceRequest:required
   */
  public Agency_RemoveClientFromWorkspace(request: RemoveClientFromWorkspaceRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Agency/RemoveClientFromWorkspace`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/AirlinePointsProgram
   * ID: POST-REST-AirlinePointsProgram
   * HttpMethod: post
   * UrlFull: REST/AirlinePointsProgram
   * UrlVar:  AirlinePointsProgram
   * ResponseType: AirlinePointsProgramResponse
   * UriParams:
   * BodyParams:
   * - airlinePointsProgramRequest:AirlinePointsProgramRequest:required
   */
  public AirlinePointsProgram_AddOrUpdateProgram(airlinePointsProgramRequest: AirlinePointsProgramRequest)
    : Promise<AirlinePointsProgramResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .post<AirlinePointsProgramResponse>(`${this.apiUrlPrefix}/AirlinePointsProgram`, airlinePointsProgramRequest, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new AirlinePointsProgramResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/AirlinePointsProgram/{userAirlinePointsProgramId}
   * ID: DELETE-REST-AirlinePointsProgram-userAirlinePointsProgramId
   * HttpMethod: delete
   * UrlFull: REST/AirlinePointsProgram/{userAirlinePointsProgramId}
   * UrlVar:  AirlinePointsProgram/${userAirlinePointsProgramId}
   * ResponseType: boolean
   * UriParams:
   * - userAirlinePointsProgramId:number:required
   * BodyParams:
   */
  public AirlinePointsProgram_DeleteProgram(userAirlinePointsProgramId: number)
    : Promise<boolean>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('userAirlinePointsProgramId', userAirlinePointsProgramId)
        .toHttpParams()
    };
    return this.http
      .delete<boolean>(`${this.apiUrlPrefix}/AirlinePointsProgram/${userAirlinePointsProgramId}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/AirlinePointsProgram
   * ID: GET-REST-AirlinePointsProgram
   * HttpMethod: get
   * UrlFull: REST/AirlinePointsProgram
   * UrlVar:  AirlinePointsProgram
   * ResponseType: AirlinePointsProgramResponse[]
   * UriParams:
   * BodyParams:
   */
  public AirlinePointsProgram_GetProgram()
    : Promise<AirlinePointsProgramResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<AirlinePointsProgramResponse[]>(`${this.apiUrlPrefix}/AirlinePointsProgram`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new AirlinePointsProgramResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/AirlinePointsProgram/itinerary/{itineraryId}/passenger/{passengerId}
   * ID: GET-REST-AirlinePointsProgram-itinerary-itineraryId-passenger-passengerId
   * HttpMethod: get
   * UrlFull: REST/AirlinePointsProgram/itinerary/{itineraryId}/passenger/{passengerId}
   * UrlVar:  AirlinePointsProgram/itinerary/${itineraryId}/passenger/${passengerId}
   * ResponseType: AirlinePointsProgram[]
   * UriParams:
   * - itineraryId:string:required
   * - passengerId:string:required
   * BodyParams:
   */
  public AirlinePointsProgram_GetProgramForItinerary(itineraryId: string, passengerId: string)
    : Promise<AirlinePointsProgram[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('passengerId', passengerId)
        .toHttpParams()
    };
    return this.http
      .get<AirlinePointsProgram[]>(`${this.apiUrlPrefix}/AirlinePointsProgram/itinerary/${itineraryId}/passenger/${passengerId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new AirlinePointsProgram(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Adds an email of Android device user to HubSpot, to be notified when Android app is released in the future.
   * URL: POST REST/AndroidSignup/RegisterEmail
   * ID: POST-REST-AndroidSignup-RegisterEmail
   * HttpMethod: post
   * UrlFull: REST/AndroidSignup/RegisterEmail
   * UrlVar:  AndroidSignup/RegisterEmail
   * ResponseType: any
   * UriParams:
   * BodyParams:
   * - email:string:required
   */
  public AndroidSignup_RegisterEmail(email: string)
    : Promise<any>
  {
    let options = { headers: this.headers };
    return this.http
      .post<any>(`${this.apiUrlPrefix}/AndroidSignup/RegisterEmail`, JSON.stringify(email), options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Endpoint to book the items flights and hotels that have been checked out.
   * URL: POST REST/Booking/pay
   * ID: POST-REST-Booking-pay
   * HttpMethod: post
   * UrlFull: REST/Booking/pay
   * UrlVar:  Booking/pay
   * ResponseType: ItineraryBookingResponse[]
   * UriParams:
   * BodyParams:
   * - input:BookingRequest:required
   */
  public Booking_BookItinerary(input: BookingRequest)
    : Promise<ItineraryBookingResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .post<ItineraryBookingResponse[]>(`${this.apiUrlPrefix}/Booking/pay`, input, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new ItineraryBookingResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Booking/itinerary/{itineraryId}
   * ID: GET-REST-Booking-itinerary-itineraryId
   * HttpMethod: get
   * UrlFull: REST/Booking/itinerary/{itineraryId}
   * UrlVar:  Booking/itinerary/${itineraryId}
   * ResponseType: BookedItineraryResponse
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Booking_GetBookedItinerary(itineraryId: string)
    : Promise<BookedItineraryResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<BookedItineraryResponse>(`${this.apiUrlPrefix}/Booking/itinerary/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new BookedItineraryResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Endpoint to get Travellers Information used in previous booking
   * URL: GET REST/Booking/getBookedTravellerInformation/{itineraryId}
   * ID: GET-REST-Booking-getBookedTravellerInformation-itineraryId
   * HttpMethod: get
   * UrlFull: REST/Booking/getBookedTravellerInformation/{itineraryId}
   * UrlVar:  Booking/getBookedTravellerInformation/${itineraryId}
   * ResponseType: BookingPassenger[]
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Booking_GetBookedTravellerInformation(itineraryId: string)
    : Promise<BookingPassenger[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<BookingPassenger[]>(`${this.apiUrlPrefix}/Booking/getBookedTravellerInformation/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new BookingPassenger(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Booking/flight/confirmation?itineraryId={itineraryId}&itemGuid={itemGuid}
   * ID: GET-REST-Booking-flight-confirmation_itineraryId_itemGuid
   * HttpMethod: get
   * UrlFull: REST/Booking/flight/confirmation?itineraryId={itineraryId}&itemGuid={itemGuid}
   * UrlVar:  Booking/flight/confirmation
   * ResponseType: FlightConfirmation
   * UriParams:
   * - itineraryId:string:required
   * - itemGuid:string:required
   * BodyParams:
   */
  public Booking_GetFlightConfirmation(itineraryId: string, itemGuid: string)
    : Promise<FlightConfirmation>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('itemGuid', itemGuid)
        .toHttpParams()
    };
    return this.http
      .get<FlightConfirmation>(`${this.apiUrlPrefix}/Booking/flight/confirmation`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new FlightConfirmation(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Booking/flight/confirmation/pdf?itineraryId={itineraryId}&itemGuid={itemGuid}
   * ID: GET-REST-Booking-flight-confirmation-pdf_itineraryId_itemGuid
   * HttpMethod: get
   * UrlFull: REST/Booking/flight/confirmation/pdf?itineraryId={itineraryId}&itemGuid={itemGuid}
   * UrlVar:  Booking/flight/confirmation/pdf
   * ResponseType: any
   * UriParams:
   * - itineraryId:string:required
   * - itemGuid:string:required
   * BodyParams:
   */
  public Booking_GetFlightConfirmationPdf(itineraryId: string, itemGuid: string)
    : Promise<any>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('itemGuid', itemGuid)
        .toHttpParams()
    };
    return this.http
      .get<any>(`${this.apiUrlPrefix}/Booking/flight/confirmation/pdf`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Booking/flight/eticket?itineraryId={itineraryId}&itemGuid={itemGuid}
   * ID: GET-REST-Booking-flight-eticket_itineraryId_itemGuid
   * HttpMethod: get
   * UrlFull: REST/Booking/flight/eticket?itineraryId={itineraryId}&itemGuid={itemGuid}
   * UrlVar:  Booking/flight/eticket
   * ResponseType: FlightETicketResponse
   * UriParams:
   * - itineraryId:string:required
   * - itemGuid:string:required
   * BodyParams:
   */
  public Booking_GetFlightETicket(itineraryId: string, itemGuid: string)
    : Promise<FlightETicketResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('itemGuid', itemGuid)
        .toHttpParams()
    };
    return this.http
      .get<FlightETicketResponse>(`${this.apiUrlPrefix}/Booking/flight/eticket`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new FlightETicketResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Booking/flight/eticket/pdf?itineraryId={itineraryId}&itemGuid={itemGuid}
   * ID: GET-REST-Booking-flight-eticket-pdf_itineraryId_itemGuid
   * HttpMethod: get
   * UrlFull: REST/Booking/flight/eticket/pdf?itineraryId={itineraryId}&itemGuid={itemGuid}
   * UrlVar:  Booking/flight/eticket/pdf
   * ResponseType: any
   * UriParams:
   * - itineraryId:string:required
   * - itemGuid:string:required
   * BodyParams:
   */
  public Booking_GetFlightETicketPdf(itineraryId: string, itemGuid: string)
    : Promise<any>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('itemGuid', itemGuid)
        .toHttpParams()
    };
    return this.http
      .get<any>(`${this.apiUrlPrefix}/Booking/flight/eticket/pdf`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Booking/hotel/confirmation?itineraryId={itineraryId}&itemGuid={itemGuid}
   * ID: GET-REST-Booking-hotel-confirmation_itineraryId_itemGuid
   * HttpMethod: get
   * UrlFull: REST/Booking/hotel/confirmation?itineraryId={itineraryId}&itemGuid={itemGuid}
   * UrlVar:  Booking/hotel/confirmation
   * ResponseType: HotelConfirmation
   * UriParams:
   * - itineraryId:string:required
   * - itemGuid:string:required
   * BodyParams:
   */
  public Booking_GetHotelConfirmation(itineraryId: string, itemGuid: string)
    : Promise<HotelConfirmation>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('itemGuid', itemGuid)
        .toHttpParams()
    };
    return this.http
      .get<HotelConfirmation>(`${this.apiUrlPrefix}/Booking/hotel/confirmation`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new HotelConfirmation(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Booking/hotel/confirmation/pdf?itineraryId={itineraryId}&itemGuid={itemGuid}
   * ID: GET-REST-Booking-hotel-confirmation-pdf_itineraryId_itemGuid
   * HttpMethod: get
   * UrlFull: REST/Booking/hotel/confirmation/pdf?itineraryId={itineraryId}&itemGuid={itemGuid}
   * UrlVar:  Booking/hotel/confirmation/pdf
   * ResponseType: any
   * UriParams:
   * - itineraryId:string:required
   * - itemGuid:string:required
   * BodyParams:
   */
  public Booking_GetHotelConfirmationPdf(itineraryId: string, itemGuid: string)
    : Promise<any>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('itemGuid', itemGuid)
        .toHttpParams()
    };
    return this.http
      .get<any>(`${this.apiUrlPrefix}/Booking/hotel/confirmation/pdf`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Booking/{itineraryId}/invoice?userId={userId}
   * ID: POST-REST-Booking-itineraryId-invoice_userId
   * HttpMethod: post
   * UrlFull: REST/Booking/{itineraryId}/invoice?userId={userId}
   * UrlVar:  Booking/${itineraryId}/invoice
   * ResponseType: IBookingConfirmation[]
   * UriParams:
   * - itineraryId:string:required
   * - userId:string:required
   * BodyParams:
   * - invoiceRequest:InvoiceRequest:required
   */
  public Booking_GetItineraryInvoices(itineraryId: string, userId: string, invoiceRequest: InvoiceRequest)
    : Promise<IBookingConfirmation[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('userId', userId)
        .toHttpParams()
    };
    return this.http
      .post<IBookingConfirmation[]>(`${this.apiUrlPrefix}/Booking/${itineraryId}/invoice`, invoiceRequest, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new IBookingConfirmation(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Booking/{itineraryId}/invoice/pdf
   * ID: POST-REST-Booking-itineraryId-invoice-pdf
   * HttpMethod: post
   * UrlFull: REST/Booking/{itineraryId}/invoice/pdf
   * UrlVar:  Booking/${itineraryId}/invoice/pdf
   * ResponseType: any
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   * - invoiceRequest:InvoiceRequest:required
   */
  public Booking_GetItineraryInvoicesInPdf(itineraryId: string, invoiceRequest: InvoiceRequest)
    : Promise<any>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<any>(`${this.apiUrlPrefix}/Booking/${itineraryId}/invoice/pdf`, invoiceRequest, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Booking/{itineraryId}/invoice/{userProfileId}/pdf
   * ID: POST-REST-Booking-itineraryId-invoice-userProfileId-pdf
   * HttpMethod: post
   * UrlFull: REST/Booking/{itineraryId}/invoice/{userProfileId}/pdf
   * UrlVar:  Booking/${itineraryId}/invoice/${userProfileId}/pdf
   * ResponseType: any
   * UriParams:
   * - itineraryId:string:required
   * - userProfileId:string:required
   * BodyParams:
   * - invoiceRequest:InvoiceRequest:required
   */
  public Booking_GetUserInvoicesInPdf(itineraryId: string, userProfileId: string, invoiceRequest: InvoiceRequest)
    : Promise<any>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('userProfileId', userProfileId)
        .toHttpParams()
    };
    return this.http
      .post<any>(`${this.apiUrlPrefix}/Booking/${itineraryId}/invoice/${userProfileId}/pdf`, invoiceRequest, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Booking/MockBook
   * ID: POST-REST-Booking-MockBook
   * HttpMethod: post
   * UrlFull: REST/Booking/MockBook
   * UrlVar:  Booking/MockBook
   * ResponseType: string
   * UriParams:
   * BodyParams:
   * - itineraryDto:ItineraryDto:required
   */
  public Booking_MockBook(itineraryDto: ItineraryDto)
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .post<string>(`${this.apiUrlPrefix}/Booking/MockBook`, itineraryDto, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Add a credit card session token for a user.
   * URL: POST REST/Card/Token
   * ID: POST-REST-Card-Token
   * HttpMethod: post
   * UrlFull: REST/Card/Token
   * UrlVar:  Card/Token
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - cardToken:CardToken:required
   */
  public Card_AddToken(cardToken: CardToken)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Card/Token`, cardToken, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get credit card details.
   * URL: GET REST/Card/Token/{token}
   * ID: GET-REST-Card-Token-token
   * HttpMethod: get
   * UrlFull: REST/Card/Token/{token}
   * UrlVar:  Card/Token/${token}
   * ResponseType: CardTokenDetails
   * UriParams:
   * - token:string:required
   * BodyParams:
   */
  public Card_GetCardDetails(token: string)
    : Promise<CardTokenDetails>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('token', token)
        .toHttpParams()
    };
    return this.http
      .get<CardTokenDetails>(`${this.apiUrlPrefix}/Card/Token/${token}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CardTokenDetails(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get a credit card session token.
   * URL: GET REST/Card/Session
   * ID: GET-REST-Card-Session
   * HttpMethod: get
   * UrlFull: REST/Card/Session
   * UrlVar:  Card/Session
   * ResponseType: SessionTokenCardStorage
   * UriParams:
   * BodyParams:
   */
  public Card_GetSessionToken()
    : Promise<SessionTokenCardStorage>
  {
    let options = { headers: this.headers };
    return this.http
      .get<SessionTokenCardStorage>(`${this.apiUrlPrefix}/Card/Session`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SessionTokenCardStorage(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get all credit card session tokens for a user.
   * URL: GET REST/Card/Token
   * ID: GET-REST-Card-Token
   * HttpMethod: get
   * UrlFull: REST/Card/Token
   * UrlVar:  Card/Token
   * ResponseType: CardToken[]
   * UriParams:
   * BodyParams:
   */
  public Card_GetTokens()
    : Promise<CardToken[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<CardToken[]>(`${this.apiUrlPrefix}/Card/Token`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CardToken(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Remove a credit card session token for a user.
   * URL: DELETE REST/Card/Token
   * ID: DELETE-REST-Card-Token
   * HttpMethod: delete
   * UrlFull: REST/Card/Token
   * UrlVar:  Card/Token
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - cardToken:CardToken:required
   */
  public Card_RemoveToken(cardToken: CardToken)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      body: cardToken
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/Card/Token`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Update a credit card session token for a user.
   * URL: PUT REST/Card/Token
   * ID: PUT-REST-Card-Token
   * HttpMethod: put
   * UrlFull: REST/Card/Token
   * UrlVar:  Card/Token
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - cardToken:CardToken:required
   */
  public Card_UpdateToken(cardToken: CardToken)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Card/Token`, cardToken, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Card/PreferedCard
   * ID: PUT-REST-Card-PreferedCard
   * HttpMethod: put
   * UrlFull: REST/Card/PreferedCard
   * UrlVar:  Card/PreferedCard
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - cardToken:ChangePreferedCard:required
   */
  public Card_UpdateToken_2(cardToken: ChangePreferedCard)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Card/PreferedCard`, cardToken, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Checkout.
   * URL: POST REST/CheckOut
   * ID: POST-REST-CheckOut
   * HttpMethod: post
   * UrlFull: REST/CheckOut
   * UrlVar:  CheckOut
   * ResponseType: ResponseDto
   * UriParams:
   * BodyParams:
   * - parameters:BookingInputParameters:required
   */
  public CheckOut_POST(parameters: BookingInputParameters)
    : Promise<ResponseDto>
  {
    let options = { headers: this.headers };
    return this.http
      .post<ResponseDto>(`${this.apiUrlPrefix}/CheckOut`, parameters, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ResponseDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Adds Companions to the logged in user with:
   * - Stub companion: need to provide all the user data
   * - An existing user: need to provide the userProfileId. the user will receive a confirmation email
   * - A non-existing user: provide an email. the invitee will receive an invitation to join the system
   * URL: POST REST/Companions/AddCompanions
   * ID: POST-REST-Companions-AddCompanions
   * HttpMethod: post
   * UrlFull: REST/Companions/AddCompanions
   * UrlVar:  Companions/AddCompanions
   * ResponseType: CompanionResponse[]
   * UriParams:
   * BodyParams:
   * - stubCompanions:StubUserProfile[]:required
   */
  public Companion_AddCompanions(stubCompanions: StubUserProfile[])
    : Promise<CompanionResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .post<CompanionResponse[]>(`${this.apiUrlPrefix}/Companions/AddCompanions`, stubCompanions, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CompanionResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Confirms companion relationship
   * URL: PUT REST/Companions/Confirm/{confirmationId}
   * ID: PUT-REST-Companions-Confirm-confirmationId
   * HttpMethod: put
   * UrlFull: REST/Companions/Confirm/{confirmationId}
   * UrlVar:  Companions/Confirm/${confirmationId}
   * ResponseType: CompanionResponse
   * UriParams:
   * - confirmationId:string:required
   * BodyParams:
   */
  public Companion_Confirm(confirmationId: string)
    : Promise<CompanionResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('confirmationId', confirmationId)
        .toHttpParams()
    };
    return this.http
      .put<CompanionResponse>(`${this.apiUrlPrefix}/Companions/Confirm/${confirmationId}`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CompanionResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Deletes companion record
   * URL: DELETE REST/Companions/{companionId}
   * ID: DELETE-REST-Companions-companionId
   * HttpMethod: delete
   * UrlFull: REST/Companions/{companionId}
   * UrlVar:  Companions/${companionId}
   * ResponseType: void
   * UriParams:
   * - companionId:string:required
   * BodyParams:
   */
  public Companion_DELETE(companionId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('companionId', companionId)
        .toHttpParams()
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/Companions/${companionId}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets all companions for the currently logged in user
   * URL: GET REST/Companions
   * ID: GET-REST-Companions
   * HttpMethod: get
   * UrlFull: REST/Companions
   * UrlVar:  Companions
   * ResponseType: CompanionResponse[]
   * UriParams:
   * BodyParams:
   */
  public Companion_GET()
    : Promise<CompanionResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<CompanionResponse[]>(`${this.apiUrlPrefix}/Companions`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CompanionResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Search pending invitations by name
   * This is a list of companions where the logged in user is the Companion (invetee)
   * URL: GET REST/Companions/Invitations?searchParam={searchParam}&skip={skip}&count={count}
   * ID: GET-REST-Companions-Invitations_searchParam_skip_count
   * HttpMethod: get
   * UrlFull: REST/Companions/Invitations?searchParam={searchParam}&skip={skip}&count={count}
   * UrlVar:  Companions/Invitations
   * ResponseType: CompanionResponse[]
   * UriParams:
   * - searchParam:string:optional
   * - skip:number:optional
   * - count:number:optional
   * BodyParams:
   */
  public Companion_GetPendingInvitations(searchParam?: string, skip?: number, count?: number)
    : Promise<CompanionResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('searchParam', searchParam)
        .setAsStr('skip', skip)
        .setAsStr('count', count)
        .toHttpParams()
    };
    return this.http
      .get<CompanionResponse[]>(`${this.apiUrlPrefix}/Companions/Invitations`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CompanionResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Add a Companion relationship to the logged in user with:
   * - A stub companion: need to provide all the user data
   * - An existing user: need to provide the userProfileId. the user will receive a confirmation email
   * - A non-existing user: provide an email. the invitee will receive an invitation to join the system
   * URL: POST REST/Companions
   * ID: POST-REST-Companions
   * HttpMethod: post
   * UrlFull: REST/Companions
   * UrlVar:  Companions
   * ResponseType: CompanionResponse
   * UriParams:
   * BodyParams:
   * - request:CompanionRequest:required
   */
  public Companion_POST(request: CompanionRequest)
    : Promise<CompanionResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .post<CompanionResponse>(`${this.apiUrlPrefix}/Companions`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CompanionResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updata a stub companion by companion id
   * URL: PUT REST/Companions
   * ID: PUT-REST-Companions
   * HttpMethod: put
   * UrlFull: REST/Companions
   * UrlVar:  Companions
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - parameters:CompanionRequest:required
   */
  public Companion_PUT(parameters: CompanionRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Companions`, parameters, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Rejects companion invitation
   * URL: DELETE REST/Companions/{id}/Invite
   * ID: DELETE-REST-Companions-id-Invite
   * HttpMethod: delete
   * UrlFull: REST/Companions/{id}/Invite
   * UrlVar:  Companions/${id}/Invite
   * ResponseType: void
   * UriParams:
   * - id:string:required
   * BodyParams:
   */
  public Companion_Reject(id: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('id', id)
        .toHttpParams()
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/Companions/${id}/Invite`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Search companions by name or email
   * URL: GET REST/Companions/search?searchParam={searchParam}&skip={skip}&count={count}
   * ID: GET-REST-Companions-search_searchParam_skip_count
   * HttpMethod: get
   * UrlFull: REST/Companions/search?searchParam={searchParam}&skip={skip}&count={count}
   * UrlVar:  Companions/search
   * ResponseType: CompanionResponse[]
   * UriParams:
   * - searchParam:string:required
   * - skip:number:optional
   * - count:number:optional
   * BodyParams:
   */
  public Companion_search(searchParam: string, skip?: number, count?: number)
    : Promise<CompanionResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('searchParam', searchParam)
        .setAsStr('skip', skip)
        .setAsStr('count', count)
        .toHttpParams()
    };
    return this.http
      .get<CompanionResponse[]>(`${this.apiUrlPrefix}/Companions/search`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CompanionResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updates a list of stub companions by companion id
   * URL: PUT REST/Companions/UpdateCompanions
   * ID: PUT-REST-Companions-UpdateCompanions
   * HttpMethod: put
   * UrlFull: REST/Companions/UpdateCompanions
   * UrlVar:  Companions/UpdateCompanions
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - companionsParameters:CompanionRequest[]:required
   */
  public Companion_UpdateCompanions(companionsParameters: CompanionRequest[])
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Companions/UpdateCompanions`, companionsParameters, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/CompanionGroup/{groupId}/Companion
   * ID: POST-REST-CompanionGroup-groupId-Companion
   * HttpMethod: post
   * UrlFull: REST/CompanionGroup/{groupId}/Companion
   * UrlVar:  CompanionGroup/${groupId}/Companion
   * ResponseType: void
   * UriParams:
   * - groupId:number:required
   * BodyParams:
   * - companionIds:string[]:required
   */
  public CompanionGroup_AddCompanionToGroup(groupId: number, companionIds: string[])
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/CompanionGroup/${groupId}/Companion`, companionIds, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/CompanionGroup
   * ID: POST-REST-CompanionGroup
   * HttpMethod: post
   * UrlFull: REST/CompanionGroup
   * UrlVar:  CompanionGroup
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - name:string:required
   */
  public CompanionGroup_AddGroup(name: string)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/CompanionGroup`, JSON.stringify(name), options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/CompanionGroup/{groupId}
   * ID: DELETE-REST-CompanionGroup-groupId
   * HttpMethod: delete
   * UrlFull: REST/CompanionGroup/{groupId}
   * UrlVar:  CompanionGroup/${groupId}
   * ResponseType: void
   * UriParams:
   * - groupId:number:required
   * BodyParams:
   */
  public CompanionGroup_DeleteGroup(groupId: number)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .toHttpParams()
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/CompanionGroup/${groupId}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/CompanionGroup/{groupId}
   * ID: GET-REST-CompanionGroup-groupId
   * HttpMethod: get
   * UrlFull: REST/CompanionGroup/{groupId}
   * UrlVar:  CompanionGroup/${groupId}
   * ResponseType: CompanionGroup
   * UriParams:
   * - groupId:number:required
   * BodyParams:
   */
  public CompanionGroup_GetGroup(groupId: number)
    : Promise<CompanionGroup>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .toHttpParams()
    };
    return this.http
      .get<CompanionGroup>(`${this.apiUrlPrefix}/CompanionGroup/${groupId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CompanionGroup(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/CompanionGroup
   * ID: GET-REST-CompanionGroup
   * HttpMethod: get
   * UrlFull: REST/CompanionGroup
   * UrlVar:  CompanionGroup
   * ResponseType: CompanionGroup[]
   * UriParams:
   * BodyParams:
   */
  public CompanionGroup_GetGroups()
    : Promise<CompanionGroup[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<CompanionGroup[]>(`${this.apiUrlPrefix}/CompanionGroup`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CompanionGroup(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/CompanionGroup/{groupId}/Companion/{companionId}
   * ID: DELETE-REST-CompanionGroup-groupId-Companion-companionId
   * HttpMethod: delete
   * UrlFull: REST/CompanionGroup/{groupId}/Companion/{companionId}
   * UrlVar:  CompanionGroup/${groupId}/Companion/${companionId}
   * ResponseType: void
   * UriParams:
   * - groupId:number:required
   * - companionId:string:required
   * BodyParams:
   */
  public CompanionGroup_RemoveCompanionFromGroup(groupId: number, companionId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .set('companionId', companionId)
        .toHttpParams()
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/CompanionGroup/${groupId}/Companion/${companionId}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/CompanionGroup/{groupId}
   * ID: PUT-REST-CompanionGroup-groupId
   * HttpMethod: put
   * UrlFull: REST/CompanionGroup/{groupId}
   * UrlVar:  CompanionGroup/${groupId}
   * ResponseType: void
   * UriParams:
   * - groupId:number:required
   * BodyParams:
   * - name:string:required
   */
  public CompanionGroup_UpdateGroup(groupId: number, name: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/CompanionGroup/${groupId}`, JSON.stringify(name), options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/ConversationHistory/{itineraryId}
   * ID: GET-REST-ConversationHistory-itineraryId
   * HttpMethod: get
   * UrlFull: REST/ConversationHistory/{itineraryId}
   * UrlVar:  ConversationHistory/${itineraryId}
   * ResponseType: ConversationHistoryResponse
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public ConversationHistory_GetConversationHistory(itineraryId: string)
    : Promise<ConversationHistoryResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<ConversationHistoryResponse>(`${this.apiUrlPrefix}/ConversationHistory/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ConversationHistoryResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/ConversationHistory/V2/{itineraryId}
   * ID: GET-REST-ConversationHistory-V2-itineraryId
   * HttpMethod: get
   * UrlFull: REST/ConversationHistory/V2/{itineraryId}
   * UrlVar:  ConversationHistory/V2/${itineraryId}
   * ResponseType: Conversation[]
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public ConversationHistory_GetConversationHistoryV2(itineraryId: string)
    : Promise<Conversation[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<Conversation[]>(`${this.apiUrlPrefix}/ConversationHistory/V2/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new Conversation(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/ConversationHistory
   * ID: POST-REST-ConversationHistory
   * HttpMethod: post
   * UrlFull: REST/ConversationHistory
   * UrlVar:  ConversationHistory
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - conversation:Conversation:required
   */
  public ConversationHistory_SaveConversation(conversation: Conversation)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/ConversationHistory`, conversation, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Feedback/SendGBTUserFeedback
   * ID: POST-REST-Feedback-SendGBTUserFeedback
   * HttpMethod: post
   * UrlFull: REST/Feedback/SendGBTUserFeedback
   * UrlVar:  Feedback/SendGBTUserFeedback
   * ResponseType: number
   * UriParams:
   * BodyParams:
   * - userFeedback:Feedback:required
   */
  public Feedback_SendGBTUserFeedback(userFeedback: Feedback)
    : Promise<number>
  {
    let options = { headers: this.headers };
    return this.http
      .post<number>(`${this.apiUrlPrefix}/Feedback/SendGBTUserFeedback`, userFeedback, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Feedback
   * ID: POST-REST-Feedback
   * HttpMethod: post
   * UrlFull: REST/Feedback
   * UrlVar:  Feedback
   * ResponseType: number
   * UriParams:
   * BodyParams:
   * - userFeedback:Feedback:required
   */
  public Feedback_SendUserFeedback(userFeedback: Feedback)
    : Promise<number>
  {
    let options = { headers: this.headers };
    return this.http
      .post<number>(`${this.apiUrlPrefix}/Feedback`, userFeedback, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get alternative flights by criteria
   * URL: GET REST/Flight?solution={solution}&paxid={paxid}&flight={flight}&alternativeFlight={alternativeFlight}
   * ID: GET-REST-Flight_solution_paxid_flight_alternativeFlight
   * HttpMethod: get
   * UrlFull: REST/Flight?solution={solution}&paxid={paxid}&flight={flight}&alternativeFlight={alternativeFlight}
   * UrlVar:  Flight
   * ResponseType: FlightResponseWithLegs[]
   * UriParams:
   * - solution:string:optional
   * - paxid:string:optional
   * - flight:string:optional
   * - alternativeFlight:string:optional
   * BodyParams:
   */
  public Flight_GET(parameters: FlightQueryParameters)
    : Promise<FlightResponseWithLegs[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solution', parameters.solution)
        .set('paxid', parameters.paxid)
        .set('flight', parameters.flight)
        .set('alternativeFlight', parameters.alternativeflight)
        .toHttpParams()
    };
    return this.http
      .get<FlightResponseWithLegs[]>(`${this.apiUrlPrefix}/Flight`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new FlightResponseWithLegs(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get flights availability/details
   * URL: GET REST/Flight/details?solution={solution}&paxid={paxid}&flight={flight}&alternativeFlight={alternativeFlight}
   * ID: GET-REST-Flight-details_solution_paxid_flight_alternativeFlight
   * HttpMethod: get
   * UrlFull: REST/Flight/details?solution={solution}&paxid={paxid}&flight={flight}&alternativeFlight={alternativeFlight}
   * UrlVar:  Flight/details
   * ResponseType: FlightResponseWithLegs
   * UriParams:
   * - solution:string:optional
   * - paxid:string:optional
   * - flight:string:optional
   * - alternativeFlight:string:optional
   * BodyParams:
   */
  public Flight_GetFlight(parameters: FlightQueryParameters)
    : Promise<FlightResponseWithLegs>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solution', parameters.solution)
        .set('paxid', parameters.paxid)
        .set('flight', parameters.flight)
        .set('alternativeFlight', parameters.alternativeflight)
        .toHttpParams()
    };
    return this.http
      .get<FlightResponseWithLegs>(`${this.apiUrlPrefix}/Flight/details`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new FlightResponseWithLegs(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get alternative flights for all flights in solution
   * URL: GET REST/Flight/alternatives?solution={solution}
   * ID: GET-REST-Flight-alternatives_solution
   * HttpMethod: get
   * UrlFull: REST/Flight/alternatives?solution={solution}
   * UrlVar:  Flight/alternatives
   * ResponseType: { [id: string]: FlightResponseWithLegs[]; }
   * UriParams:
   * - solution:string:optional
   * BodyParams:
   */
  public Flight_GetSolutionItemsAlternatives(solution?: string)
    : Promise<{ [id: string]: FlightResponseWithLegs[]; }>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solution', solution)
        .toHttpParams()
    };
    return this.http
      .get<{ [id: string]: FlightResponseWithLegs[]; }>(`${this.apiUrlPrefix}/Flight/alternatives`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.mapValues(response, y => _.map(y, x => x ? new FlightResponseWithLegs(x) : null)))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Change primary flight
   * URL: PUT REST/Flight
   * ID: PUT-REST-Flight
   * HttpMethod: put
   * UrlFull: REST/Flight
   * UrlVar:  Flight
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - bodyParameters:FlightPutParameters:required
   */
  public Flight_PUT(bodyParameters: FlightPutParameters)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Flight`, bodyParameters, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Flight/SetSeat
   * ID: PUT-REST-Flight-SetSeat
   * HttpMethod: put
   * UrlFull: REST/Flight/SetSeat
   * UrlVar:  Flight/SetSeat
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - seatPreferenceRequest:FlightSeatPreference:required
   */
  public Flight_SetSeat(seatPreferenceRequest: FlightSeatPreference)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Flight/SetSeat`, seatPreferenceRequest, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * When there is a change in a ticketed flight booking this endpoint will be called from FN
   * to notify hgb of the change on that PNR so we fetch the ticket information again
   * URL: POST REST/Flight
   * ID: POST-REST-Flight
   * HttpMethod: post
   * UrlFull: REST/Flight
   * UrlVar:  Flight
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - input:UpdateTicketInfoRequest:required
   */
  public Flight_UpdateTicketInfo(input: UpdateTicketInfoRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Flight`, input, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Highlight/QaPreScan?input={input}&itineraryId={itineraryId}
   * ID: POST-REST-Highlight-QaPreScan_input_itineraryId
   * HttpMethod: post
   * UrlFull: REST/Highlight/QaPreScan?input={input}&itineraryId={itineraryId}
   * UrlVar:  Highlight/QaPreScan
   * ResponseType: PreScanReviewChunks
   * UriParams:
   * - input:string:required
   * - itineraryId:string:optional
   * BodyParams:
   */
  public Highlight_GetPreScanTokens(input: string, itineraryId?: string)
    : Promise<PreScanReviewChunks>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('input', input)
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<PreScanReviewChunks>(`${this.apiUrlPrefix}/Highlight/QaPreScan`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new PreScanReviewChunks(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Highlight?input={input}&itineraryId={itineraryId}&clientConnectionId={clientConnectionId}
   * ID: GET-REST-Highlight_input_itineraryId_clientConnectionId
   * HttpMethod: get
   * UrlFull: REST/Highlight?input={input}&itineraryId={itineraryId}&clientConnectionId={clientConnectionId}
   * UrlVar:  Highlight
   * ResponseType: HighlightSearchListResponse
   * UriParams:
   * - input:string:required
   * - itineraryId:string:optional
   * - clientConnectionId:string:optional
   * BodyParams:
   */
  public Highlight_HighlightSearch(input: string, itineraryId?: string, clientConnectionId?: string)
    : Promise<HighlightSearchListResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('input', input)
        .set('itineraryId', itineraryId)
        .set('clientConnectionId', clientConnectionId)
        .toHttpParams()
    };
    return this.http
      .get<HighlightSearchListResponse>(`${this.apiUrlPrefix}/Highlight`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new HighlightSearchListResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Highlight/QaSubmitFixed
   * ID: POST-REST-Highlight-QaSubmitFixed
   * HttpMethod: post
   * UrlFull: REST/Highlight/QaSubmitFixed
   * UrlVar:  Highlight/QaSubmitFixed
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - request:ParserSpeakCliDto:required
   */
  public Highlight_SubmitFixedQuery(request: ParserSpeakCliDto)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Highlight/QaSubmitFixed`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Highlight/QaSubmitFixedPS?psString={psString}&itineraryId={itineraryId}
   * ID: POST-REST-Highlight-QaSubmitFixedPS_psString_itineraryId
   * HttpMethod: post
   * UrlFull: REST/Highlight/QaSubmitFixedPS?psString={psString}&itineraryId={itineraryId}
   * UrlVar:  Highlight/QaSubmitFixedPS
   * ResponseType: void
   * UriParams:
   * - psString:string:required
   * - itineraryId:string:required
   * BodyParams:
   */
  public Highlight_SubmitFixedQueryPsOnly(psString: string, itineraryId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('psString', psString)
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Highlight/QaSubmitFixedPS`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get alternative hotels
   * URL: GET REST/Hotel?solution={solution}&hotelid={hotelid}&paxid={paxid}&checkin={checkin}&checkout={checkout}&isPromoAlternative={isPromoAlternative}&alternativeHotel={alternativeHotel}
   * ID: GET-REST-Hotel_solution_hotelid_paxid_checkin_checkout_isPromoAlternative_alternativeHotel
   * HttpMethod: get
   * UrlFull: REST/Hotel?solution={solution}&hotelid={hotelid}&paxid={paxid}&checkin={checkin}&checkout={checkout}&isPromoAlternative={isPromoAlternative}&alternativeHotel={alternativeHotel}
   * UrlVar:  Hotel
   * ResponseType: HotelResponse[]
   * UriParams:
   * - solution:string:optional
   * - hotelid:string:optional
   * - paxid:string:optional
   * - checkin:Date:optional
   * - checkout:Date:optional
   * - isPromoAlternative:boolean:optional
   * - alternativeHotel:string:optional
   * BodyParams:
   */
  public Hotel_GET(parameters: HotelQueryParameters)
    : Promise<HotelResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solution', parameters.solution)
        .set('hotelid', parameters.hotelid)
        .set('paxid', parameters.paxid)
        .setAsStr('checkin', parameters.checkin)
        .setAsStr('checkout', parameters.checkout)
        .setAsStr('isPromoAlternative', parameters.ispromoalternative)
        .set('alternativeHotel', parameters.alternativehotel)
        .toHttpParams()
    };
    return this.http
      .get<HotelResponse[]>(`${this.apiUrlPrefix}/Hotel`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new HotelResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get hotel availability/details
   * URL: GET REST/Hotel/details?solution={solution}&hotelid={hotelid}&paxid={paxid}&checkin={checkin}&checkout={checkout}&isPromoAlternative={isPromoAlternative}&alternativeHotel={alternativeHotel}
   * ID: GET-REST-Hotel-details_solution_hotelid_paxid_checkin_checkout_isPromoAlternative_alternativeHotel
   * HttpMethod: get
   * UrlFull: REST/Hotel/details?solution={solution}&hotelid={hotelid}&paxid={paxid}&checkin={checkin}&checkout={checkout}&isPromoAlternative={isPromoAlternative}&alternativeHotel={alternativeHotel}
   * UrlVar:  Hotel/details
   * ResponseType: HotelResponse
   * UriParams:
   * - solution:string:optional
   * - hotelid:string:optional
   * - paxid:string:optional
   * - checkin:Date:optional
   * - checkout:Date:optional
   * - isPromoAlternative:boolean:optional
   * - alternativeHotel:string:optional
   * BodyParams:
   */
  public Hotel_GetHotel(parameters: HotelQueryParameters)
    : Promise<HotelResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solution', parameters.solution)
        .set('hotelid', parameters.hotelid)
        .set('paxid', parameters.paxid)
        .setAsStr('checkin', parameters.checkin)
        .setAsStr('checkout', parameters.checkout)
        .setAsStr('isPromoAlternative', parameters.ispromoalternative)
        .set('alternativeHotel', parameters.alternativehotel)
        .toHttpParams()
    };
    return this.http
      .get<HotelResponse>(`${this.apiUrlPrefix}/Hotel/details`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new HotelResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get places near the requested location.
   * URL: GET REST/Hotel/Places/{lat}/{lng}?placeToSearch={placeToSearch}
   * ID: GET-REST-Hotel-Places-lat-lng_placeToSearch
   * HttpMethod: get
   * UrlFull: REST/Hotel/Places/{lat}/{lng}?placeToSearch={placeToSearch}
   * UrlVar:  Hotel/Places/${lat}/${lng}
   * ResponseType: PlacesResultList
   * UriParams:
   * - lat:number:required
   * - lng:number:required
   * - placeToSearch:string:required
   * BodyParams:
   */
  public Hotel_GetPlaces(lat: number, lng: number, placeToSearch: string)
    : Promise<PlacesResultList>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('lat', lat)
        .setAsStr('lng', lng)
        .set('placeToSearch', placeToSearch)
        .toHttpParams()
    };
    return this.http
      .get<PlacesResultList>(`${this.apiUrlPrefix}/Hotel/Places/${lat}/${lng}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new PlacesResultList(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Hotel/PlacesHotel?query={query}
   * ID: GET-REST-Hotel-PlacesHotel_query
   * HttpMethod: get
   * UrlFull: REST/Hotel/PlacesHotel?query={query}
   * UrlVar:  Hotel/PlacesHotel
   * ResponseType: PlacesResultList
   * UriParams:
   * - query:string:optional
   * BodyParams:
   */
  public Hotel_GetPlaces_2(query?: string)
    : Promise<PlacesResultList>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('query', query)
        .toHttpParams()
    };
    return this.http
      .get<PlacesResultList>(`${this.apiUrlPrefix}/Hotel/PlacesHotel`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new PlacesResultList(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get alternative hotels for all hotels in solution
   * URL: GET REST/Hotel/alternatives?solution={solution}
   * ID: GET-REST-Hotel-alternatives_solution
   * HttpMethod: get
   * UrlFull: REST/Hotel/alternatives?solution={solution}
   * UrlVar:  Hotel/alternatives
   * ResponseType: { [id: string]: HotelResponse[]; }
   * UriParams:
   * - solution:string:optional
   * BodyParams:
   */
  public Hotel_GetSolutionItemsAlternatives(solution?: string)
    : Promise<{ [id: string]: HotelResponse[]; }>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solution', solution)
        .toHttpParams()
    };
    return this.http
      .get<{ [id: string]: HotelResponse[]; }>(`${this.apiUrlPrefix}/Hotel/alternatives`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.mapValues(response, y => _.map(y, x => x ? new HotelResponse(x) : null)))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Change Primary Hotel
   * URL: PUT REST/Hotel
   * ID: PUT-REST-Hotel
   * HttpMethod: put
   * UrlFull: REST/Hotel
   * UrlVar:  Hotel
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - paramz:HotelPutParameters:required
   */
  public Hotel_PUT(paramz: HotelPutParameters)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Hotel`, paramz, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Hotel/Search
   * ID: POST-REST-Hotel-Search
   * HttpMethod: post
   * UrlFull: REST/Hotel/Search
   * UrlVar:  Hotel/Search
   * ResponseType: HotelResponse[]
   * UriParams:
   * BodyParams:
   * - bodyParameters:HotelSearchParameters:required
   */
  public Hotel_Search(bodyParameters: HotelSearchParameters)
    : Promise<HotelResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .post<HotelResponse[]>(`${this.apiUrlPrefix}/Hotel/Search`, bodyParameters, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new HotelResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get alternative HotelRooms
   * URL: GET REST/HotelRoom?solution={solution}&paxid={paxid}&checkin={checkin}&checkout={checkout}&HotelCode={HotelCode}&HotelId={HotelId}
   * ID: GET-REST-HotelRoom_solution_paxid_checkin_checkout_HotelCode_HotelId
   * HttpMethod: get
   * UrlFull: REST/HotelRoom?solution={solution}&paxid={paxid}&checkin={checkin}&checkout={checkout}&HotelCode={HotelCode}&HotelId={HotelId}
   * UrlVar:  HotelRoom
   * ResponseType: HotelResponse
   * UriParams:
   * - solution:string:optional
   * - paxid:string:optional
   * - checkin:Date:optional
   * - checkout:Date:optional
   * - HotelCode:string:optional
   * - HotelId:string:optional
   * BodyParams:
   */
  public HotelRoom_GET(parameters: HotelRoomQueryParameters)
    : Promise<HotelResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solution', parameters.solution)
        .set('paxid', parameters.paxid)
        .setAsStr('checkin', parameters.checkin)
        .setAsStr('checkout', parameters.checkout)
        .set('HotelCode', parameters.hotelcode)
        .set('HotelId', parameters.hotelid)
        .toHttpParams()
    };
    return this.http
      .get<HotelResponse>(`${this.apiUrlPrefix}/HotelRoom`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new HotelResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Change the primary hotel room
   * URL: PUT REST/HotelRoom
   * ID: PUT-REST-HotelRoom
   * HttpMethod: put
   * UrlFull: REST/HotelRoom
   * UrlVar:  HotelRoom
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - bodyParameters:HotelRoomPutBodyParameters:required
   */
  public HotelRoom_PUT(bodyParameters: HotelRoomPutBodyParameters)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .put<boolean>(`${this.apiUrlPrefix}/HotelRoom`, bodyParameters, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Sends an invitation email to the requested address.
   * URL: POST REST/Invitation
   * ID: POST-REST-Invitation
   * HttpMethod: post
   * UrlFull: REST/Invitation
   * UrlVar:  Invitation
   * ResponseType: string
   * UriParams:
   * BodyParams:
   * - request:SendInvitationRequest:required
   */
  public Invitation_SendInvitation(request: SendInvitationRequest)
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .post<string>(`${this.apiUrlPrefix}/Invitation`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Invoice/{userProfileId}
   * ID: POST-REST-Invoice-userProfileId
   * HttpMethod: post
   * UrlFull: REST/Invoice/{userProfileId}
   * UrlVar:  Invoice/${userProfileId}
   * ResponseType: void
   * UriParams:
   * - userProfileId:string:required
   * BodyParams:
   */
  public Invoice_CreateAndBillInvoice(userProfileId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('userProfileId', userProfileId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Invoice/${userProfileId}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get the user's profile.
   * URL: GET REST/Invoice
   * ID: GET-REST-Invoice
   * HttpMethod: get
   * UrlFull: REST/Invoice
   * UrlVar:  Invoice
   * ResponseType: UserInvoiceResponse[]
   * UriParams:
   * BodyParams:
   */
  public Invoice_GET()
    : Promise<UserInvoiceResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<UserInvoiceResponse[]>(`${this.apiUrlPrefix}/Invoice`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new UserInvoiceResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Invoice/search?isPaid={isPaid}&month={month}&year={year}&skip={skip}&count={count}
   * ID: GET-REST-Invoice-search_isPaid_month_year_skip_count
   * HttpMethod: get
   * UrlFull: REST/Invoice/search?isPaid={isPaid}&month={month}&year={year}&skip={skip}&count={count}
   * UrlVar:  Invoice/search
   * ResponseType: UserInvoiceResponse[]
   * UriParams:
   * - isPaid:boolean:optional
   * - month:number:optional
   * - year:number:optional
   * - skip:number:optional
   * - count:number:optional
   * BodyParams:
   */
  public Invoice_search(isPaid?: boolean, month?: number, year?: number, skip?: number, count?: number)
    : Promise<UserInvoiceResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('isPaid', isPaid)
        .setAsStr('month', month)
        .setAsStr('year', year)
        .setAsStr('skip', skip)
        .setAsStr('count', count)
        .toHttpParams()
    };
    return this.http
      .get<UserInvoiceResponse[]>(`${this.apiUrlPrefix}/Invoice/search`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new UserInvoiceResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/Email/Request
   * ID: POST-REST-Itinerary-AgentDesk-Email-Request
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/Email/Request
   * UrlVar:  Itinerary/AgentDesk/Email/Request
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - request:AgentDeskEmailRequest:required
   */
  public Itinerary_AgentDeskEmail(request: AgentDeskEmailRequest)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/Email/Request`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/WebStatic/Request
   * ID: POST-REST-Itinerary-AgentDesk-WebStatic-Request
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/WebStatic/Request
   * UrlVar:  Itinerary/AgentDesk/WebStatic/Request
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - request:AgentDeskWebStaticRequest:required
   */
  public Itinerary_AgentDeskWebStatic(request: AgentDeskWebStaticRequest)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/WebStatic/Request`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/ApproveDraft
   * ID: POST-REST-Itinerary-AgentDesk-ApproveDraft
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/ApproveDraft
   * UrlVar:  Itinerary/AgentDesk/ApproveDraft
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - req:UpdateItineraryAgentRequest:required
   */
  public Itinerary_ApproveDraft(req: UpdateItineraryAgentRequest)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/ApproveDraft`, req, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/AssociateTransactionToWorkspace?transactionId={transactionId}&workspaceId={workspaceId}&itineraryId={itineraryId}
   * ID: POST-REST-Itinerary-AgentDesk-AssociateTransactionToWorkspace_transactionId_workspaceId_itineraryId
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/AssociateTransactionToWorkspace?transactionId={transactionId}&workspaceId={workspaceId}&itineraryId={itineraryId}
   * UrlVar:  Itinerary/AgentDesk/AssociateTransactionToWorkspace
   * ResponseType: boolean
   * UriParams:
   * - transactionId:number:required
   * - workspaceId:number:required
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_AssociateTransactionToWorkspace(transactionId: number, workspaceId: number, itineraryId: string)
    : Promise<boolean>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('transactionId', transactionId)
        .setAsStr('workspaceId', workspaceId)
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/AssociateTransactionToWorkspace`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/Itinerary/{itineraryId}/Flight/{flightId}
   * ID: DELETE-REST-Itinerary-itineraryId-Flight-flightId
   * HttpMethod: delete
   * UrlFull: REST/Itinerary/{itineraryId}/Flight/{flightId}
   * UrlVar:  Itinerary/${itineraryId}/Flight/${flightId}
   * ResponseType: CancellationResponse
   * UriParams:
   * - itineraryId:string:required
   * - flightId:string:required
   * BodyParams:
   */
  public Itinerary_CancelFlightBooking(itineraryId: string, flightId: string)
    : Promise<CancellationResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('flightId', flightId)
        .toHttpParams()
    };
    return this.http
      .delete<CancellationResponse>(`${this.apiUrlPrefix}/Itinerary/${itineraryId}/Flight/${flightId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CancellationResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/Itinerary/{itineraryId}/Hotel/{hotelId}
   * ID: DELETE-REST-Itinerary-itineraryId-Hotel-hotelId
   * HttpMethod: delete
   * UrlFull: REST/Itinerary/{itineraryId}/Hotel/{hotelId}
   * UrlVar:  Itinerary/${itineraryId}/Hotel/${hotelId}
   * ResponseType: CancellationResponse
   * UriParams:
   * - itineraryId:string:required
   * - hotelId:string:required
   * BodyParams:
   */
  public Itinerary_CancelHotelBooking(itineraryId: string, hotelId: string)
    : Promise<CancellationResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('hotelId', hotelId)
        .toHttpParams()
    };
    return this.http
      .delete<CancellationResponse>(`${this.apiUrlPrefix}/Itinerary/${itineraryId}/Hotel/${hotelId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CancellationResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/ConsolidationScan
   * ID: POST-REST-Itinerary-ConsolidationScan
   * HttpMethod: post
   * UrlFull: REST/Itinerary/ConsolidationScan
   * UrlVar:  Itinerary/ConsolidationScan
   * ResponseType: ConsolidationResponse
   * UriParams:
   * BodyParams:
   * - request:string:required
   */
  public Itinerary_ConsolidationScan(request: string)
    : Promise<ConsolidationResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .post<ConsolidationResponse>(`${this.apiUrlPrefix}/Itinerary/ConsolidationScan`, JSON.stringify(request), options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ConsolidationResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/TestNetwork
   * ID: POST-REST-Itinerary-TestNetwork
   * HttpMethod: post
   * UrlFull: REST/Itinerary/TestNetwork
   * UrlVar:  Itinerary/TestNetwork
   * ResponseType: TestNetworkResult
   * UriParams:
   * BodyParams:
   * - request:string:required
   */
  public Itinerary_CreateNetwork(request: string)
    : Promise<TestNetworkResult>
  {
    let options = { headers: this.headers };
    return this.http
      .post<TestNetworkResult>(`${this.apiUrlPrefix}/Itinerary/TestNetwork`, JSON.stringify(request), options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new TestNetworkResult(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/DebugConsolidationScan
   * ID: POST-REST-Itinerary-DebugConsolidationScan
   * HttpMethod: post
   * UrlFull: REST/Itinerary/DebugConsolidationScan
   * UrlVar:  Itinerary/DebugConsolidationScan
   * ResponseType: DebugConsolidationResponse
   * UriParams:
   * BodyParams:
   * - request:string:required
   */
  public Itinerary_DebugConsolidationScan(request: string)
    : Promise<DebugConsolidationResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .post<DebugConsolidationResponse>(`${this.apiUrlPrefix}/Itinerary/DebugConsolidationScan`, JSON.stringify(request), options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new DebugConsolidationResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/Itinerary/{itineraryId}
   * ID: DELETE-REST-Itinerary-itineraryId
   * HttpMethod: delete
   * UrlFull: REST/Itinerary/{itineraryId}
   * UrlVar:  Itinerary/${itineraryId}
   * ResponseType: CancellationResponse[]
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_DELETE(itineraryId: string)
    : Promise<CancellationResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .delete<CancellationResponse[]>(`${this.apiUrlPrefix}/Itinerary/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CancellationResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/ExecuteUserAction
   * ID: POST-REST-Itinerary-AgentDesk-ExecuteUserAction
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/ExecuteUserAction
   * UrlVar:  Itinerary/AgentDesk/ExecuteUserAction
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - request:ExecuteUserActionRequest:required
   */
  public Itinerary_ExecuteUserAction(request: ExecuteUserActionRequest)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/ExecuteUserAction`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Returns Solutions for the user
   * URL: GET REST/Itinerary?count={count}&skip={skip}&isFavorite={isFavorite}&paymentStatus={paymentStatus}&upcomingtrips={upcomingtrips}&name={name}
   * ID: GET-REST-Itinerary_count_skip_isFavorite_paymentStatus_upcomingtrips_name
   * HttpMethod: get
   * UrlFull: REST/Itinerary?count={count}&skip={skip}&isFavorite={isFavorite}&paymentStatus={paymentStatus}&upcomingtrips={upcomingtrips}&name={name}
   * UrlVar:  Itinerary
   * ResponseType: ItineraryDetail[]
   * UriParams:
   * - count:number:optional
   * - skip:number:optional
   * - isFavorite:boolean:optional
   * - paymentStatus:string:optional
   * - upcomingtrips:boolean:optional
   * - name:string:optional
   * BodyParams:
   */
  public Itinerary_GET(count?: number, skip?: number, isFavorite?: boolean, paymentStatus?: string, upcomingtrips?: boolean, name?: string)
    : Promise<ItineraryDetail[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('count', count)
        .setAsStr('skip', skip)
        .setAsStr('isFavorite', isFavorite)
        .set('paymentStatus', paymentStatus)
        .setAsStr('upcomingtrips', upcomingtrips)
        .set('name', name)
        .toHttpParams()
    };
    return this.http
      .get<ItineraryDetail[]>(`${this.apiUrlPrefix}/Itinerary`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new ItineraryDetail(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/GetAndLockNextTransaction/{state}
   * ID: POST-REST-Itinerary-AgentDesk-GetAndLockNextTransaction-state
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/GetAndLockNextTransaction/{state}
   * UrlVar:  Itinerary/AgentDesk/GetAndLockNextTransaction/${state}
   * ResponseType: TransactionDto
   * UriParams:
   * - state:ItineraryState:required
   * BodyParams:
   */
  public Itinerary_GetAndLockNextTransaction(state: ItineraryState)
    : Promise<TransactionDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('state', state)
        .toHttpParams()
    };
    return this.http
      .post<TransactionDto>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetAndLockNextTransaction/${state}`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new TransactionDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/booked/{itineraryId}/{connectionId}
   * ID: GET-REST-Itinerary-booked-itineraryId-connectionId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/booked/{itineraryId}/{connectionId}
   * UrlVar:  Itinerary/booked/${itineraryId}
   * ResponseType: ResponseDto
   * UriParams:
   * - itineraryId:string:required
   * - connectionId:string:optional
   * BodyParams:
   */
  public Itinerary_GetBookedById(itineraryId: string, connectionId?: string)
    : Promise<ResponseDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('connectionId', connectionId)
        .toHttpParams()
    };
    return this.http
      .get<ResponseDto>(`${this.apiUrlPrefix}/Itinerary/booked/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ResponseDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/{itineraryId}/{connectionId}?goroomintersect={goroomintersect}
   * ID: GET-REST-Itinerary-itineraryId-connectionId_goroomintersect
   * HttpMethod: get
   * UrlFull: REST/Itinerary/{itineraryId}/{connectionId}?goroomintersect={goroomintersect}
   * UrlVar:  Itinerary/${itineraryId}
   * ResponseType: ResponseDto
   * UriParams:
   * - itineraryId:string:required
   * - connectionId:string:optional
   * - goroomintersect:number:optional
   * BodyParams:
   */
  public Itinerary_GetById(itineraryId: string, connectionId?: string, goroomintersect?: number)
    : Promise<ResponseDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .set('connectionId', connectionId)
        .setAsStr('goroomintersect', goroomintersect)
        .toHttpParams()
    };
    return this.http
      .get<ResponseDto>(`${this.apiUrlPrefix}/Itinerary/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ResponseDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetItinerariesForTransaction?transactionId={transactionId}&state={state}
   * ID: GET-REST-Itinerary-AgentDesk-GetItinerariesForTransaction_transactionId_state
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetItinerariesForTransaction?transactionId={transactionId}&state={state}
   * UrlVar:  Itinerary/AgentDesk/GetItinerariesForTransaction
   * ResponseType: ItineraryDto[]
   * UriParams:
   * - transactionId:number:required
   * - state:ItineraryState:optional
   * BodyParams:
   */
  public Itinerary_GetItinerariesForTransaction(transactionId: number, state?: ItineraryState)
    : Promise<ItineraryDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('transactionId', transactionId)
        .setAsStr('state', state)
        .toHttpParams()
    };
    return this.http
      .get<ItineraryDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetItinerariesForTransaction`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new ItineraryDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetItinerariesFromWorkspace?workspaceId={workspaceId}&state={state}
   * ID: GET-REST-Itinerary-AgentDesk-GetItinerariesFromWorkspace_workspaceId_state
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetItinerariesFromWorkspace?workspaceId={workspaceId}&state={state}
   * UrlVar:  Itinerary/AgentDesk/GetItinerariesFromWorkspace
   * ResponseType: ItineraryDto[]
   * UriParams:
   * - workspaceId:number:required
   * - state:ItineraryState:optional
   * BodyParams:
   */
  public Itinerary_GetItinerariesFromWorkspace(workspaceId: number, state?: ItineraryState)
    : Promise<ItineraryDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('workspaceId', workspaceId)
        .setAsStr('state', state)
        .toHttpParams()
    };
    return this.http
      .get<ItineraryDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetItinerariesFromWorkspace`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new ItineraryDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetItinerariesTransactionHistory?transactionId={transactionId}
   * ID: GET-REST-Itinerary-AgentDesk-GetItinerariesTransactionHistory_transactionId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetItinerariesTransactionHistory?transactionId={transactionId}
   * UrlVar:  Itinerary/AgentDesk/GetItinerariesTransactionHistory
   * ResponseType: ItineraryDto[]
   * UriParams:
   * - transactionId:number:required
   * BodyParams:
   */
  public Itinerary_GetItinerariesTransactionHistory(transactionId: number)
    : Promise<ItineraryDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('transactionId', transactionId)
        .toHttpParams()
    };
    return this.http
      .get<ItineraryDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetItinerariesTransactionHistory`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new ItineraryDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/{itineraryId}/review
   * ID: GET-REST-Itinerary-AgentDesk-itineraryId-review
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/{itineraryId}/review
   * UrlVar:  Itinerary/AgentDesk/${itineraryId}/review
   * ResponseType: ItineraryReviewDto
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_GetItineraryForReview(itineraryId: string)
    : Promise<ItineraryReviewDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<ItineraryReviewDto>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/${itineraryId}/review`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ItineraryReviewDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetItineraryFromExternalId?externalId={externalId}
   * ID: GET-REST-Itinerary-AgentDesk-GetItineraryFromExternalId_externalId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetItineraryFromExternalId?externalId={externalId}
   * UrlVar:  Itinerary/AgentDesk/GetItineraryFromExternalId
   * ResponseType: ItineraryDto
   * UriParams:
   * - externalId:string:required
   * BodyParams:
   */
  public Itinerary_GetItineraryFromExternalId(externalId: string)
    : Promise<ItineraryDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('externalId', externalId)
        .toHttpParams()
    };
    return this.http
      .get<ItineraryDto>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetItineraryFromExternalId`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ItineraryDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetItineraryTripsIndex?itineraryId={itineraryId}
   * ID: GET-REST-Itinerary-AgentDesk-GetItineraryTripsIndex_itineraryId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetItineraryTripsIndex?itineraryId={itineraryId}
   * UrlVar:  Itinerary/AgentDesk/GetItineraryTripsIndex
   * ResponseType: number
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_GetItineraryTripsIndex(itineraryId: string)
    : Promise<number>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<number>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetItineraryTripsIndex`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/GetPrioritizedTransactions
   * ID: POST-REST-Itinerary-AgentDesk-GetPrioritizedTransactions
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/GetPrioritizedTransactions
   * UrlVar:  Itinerary/AgentDesk/GetPrioritizedTransactions
   * ResponseType: TransactionDto[]
   * UriParams:
   * BodyParams:
   * - req:GetPrioritizedTransactionsReq:required
   */
  public Itinerary_GetPrioritizedTransactions(req: GetPrioritizedTransactionsReq)
    : Promise<TransactionDto[]>
  {
    let options = { headers: this.headers };
    return this.http
      .post<TransactionDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetPrioritizedTransactions`, req, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TransactionDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetReadyOrSuspenseTransactions
   * ID: GET-REST-Itinerary-AgentDesk-GetReadyOrSuspenseTransactions
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetReadyOrSuspenseTransactions
   * UrlVar:  Itinerary/AgentDesk/GetReadyOrSuspenseTransactions
   * ResponseType: TransactionDto[]
   * UriParams:
   * BodyParams:
   */
  public Itinerary_GetReadyOrSuspenseTransactions()
    : Promise<TransactionDto[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<TransactionDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetReadyOrSuspenseTransactions`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TransactionDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Temporary Endpoint to test the AgentDesk Report Objects
   * URL: GET REST/Itinerary/AgentDesk/GetReports
   * ID: GET-REST-Itinerary-AgentDesk-GetReports
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetReports
   * UrlVar:  Itinerary/AgentDesk/GetReports
   * ResponseType: { [id: string]: AgentDeskReport; }
   * UriParams:
   * BodyParams:
   */
  public Itinerary_GetReports()
    : Promise<{ [id: string]: AgentDeskReport; }>
  {
    let options = { headers: this.headers };
    return this.http
      .get<{ [id: string]: AgentDeskReport; }>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetReports`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.mapValues(response, x => x ? new AgentDeskReport(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/Resolutions?e={e}&iid={iid}
   * ID: GET-REST-Itinerary-Resolutions_e_iid
   * HttpMethod: get
   * UrlFull: REST/Itinerary/Resolutions?e={e}&iid={iid}
   * UrlVar:  Itinerary/Resolutions
   * ResponseType: NetworkResolution[]
   * UriParams:
   * - e:string:required
   * - iid:string:required
   * BodyParams:
   */
  public Itinerary_GetResolutions(e: string, iid: string)
    : Promise<NetworkResolution[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('e', e)
        .set('iid', iid)
        .toHttpParams()
    };
    return this.http
      .get<NetworkResolution[]>(`${this.apiUrlPrefix}/Itinerary/Resolutions`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new NetworkResolution(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/Review?failedOnly={failedOnly}
   * ID: GET-REST-Itinerary-Review_failedOnly
   * HttpMethod: get
   * UrlFull: REST/Itinerary/Review?failedOnly={failedOnly}
   * UrlVar:  Itinerary/Review
   * ResponseType: SearchQueryLog[]
   * UriParams:
   * - failedOnly:boolean:optional
   * BodyParams:
   */
  public Itinerary_GetReviews(failedOnly?: boolean)
    : Promise<SearchQueryLog[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('failedOnly', failedOnly)
        .toHttpParams()
    };
    return this.http
      .get<SearchQueryLog[]>(`${this.apiUrlPrefix}/Itinerary/Review`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new SearchQueryLog(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/StateMap
   * ID: GET-REST-Itinerary-AgentDesk-StateMap
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/StateMap
   * UrlVar:  Itinerary/AgentDesk/StateMap
   * ResponseType: { [id: string]: ItineraryState[]; }
   * UriParams:
   * BodyParams:
   */
  public Itinerary_GetStateMap()
    : Promise<{ [id: string]: ItineraryState[]; }>
  {
    let options = { headers: this.headers };
    return this.http
      .get<{ [id: string]: ItineraryState[]; }>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/StateMap`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.mapValues(response, y => _.map(y, x => isNaN(x) ? ItineraryState[x] : x)))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/States
   * ID: GET-REST-Itinerary-AgentDesk-States
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/States
   * UrlVar:  Itinerary/AgentDesk/States
   * ResponseType: { [id: string]: string; }
   * UriParams:
   * BodyParams:
   */
  public Itinerary_GetStates()
    : Promise<{ [id: string]: string; }>
  {
    let options = { headers: this.headers };
    return this.http
      .get<{ [id: string]: string; }>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/States`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetTransactionAuditForItinerary?itineraryId={itineraryId}
   * ID: GET-REST-Itinerary-AgentDesk-GetTransactionAuditForItinerary_itineraryId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetTransactionAuditForItinerary?itineraryId={itineraryId}
   * UrlVar:  Itinerary/AgentDesk/GetTransactionAuditForItinerary
   * ResponseType: TransactionDto[]
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_GetTransactionAuditForItinerary(itineraryId: string)
    : Promise<TransactionDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<TransactionDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetTransactionAuditForItinerary`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TransactionDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetTransactionAuditForWorkspace?workspaceId={workspaceId}
   * ID: GET-REST-Itinerary-AgentDesk-GetTransactionAuditForWorkspace_workspaceId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetTransactionAuditForWorkspace?workspaceId={workspaceId}
   * UrlVar:  Itinerary/AgentDesk/GetTransactionAuditForWorkspace
   * ResponseType: TransactionDto[]
   * UriParams:
   * - workspaceId:number:required
   * BodyParams:
   */
  public Itinerary_GetTransactionAuditForWorkspace(workspaceId: number)
    : Promise<TransactionDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('workspaceId', workspaceId)
        .toHttpParams()
    };
    return this.http
      .get<TransactionDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetTransactionAuditForWorkspace`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TransactionDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/{itineraryId}/User
   * ID: GET-REST-Itinerary-itineraryId-User
   * HttpMethod: get
   * UrlFull: REST/Itinerary/{itineraryId}/User
   * UrlVar:  Itinerary/${itineraryId}/User
   * ResponseType: string
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_GetUserIdForItinerary(itineraryId: string)
    : Promise<string>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<string>(`${this.apiUrlPrefix}/Itinerary/${itineraryId}/User`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/GetWorkspaceFromTransaction?transactionId={transactionId}
   * ID: GET-REST-Itinerary-AgentDesk-GetWorkspaceFromTransaction_transactionId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/GetWorkspaceFromTransaction?transactionId={transactionId}
   * UrlVar:  Itinerary/AgentDesk/GetWorkspaceFromTransaction
   * ResponseType: WorkspaceTransactionDto[]
   * UriParams:
   * - transactionId:number:required
   * BodyParams:
   */
  public Itinerary_GetWorkspaceFromTransaction(transactionId: number)
    : Promise<WorkspaceTransactionDto[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('transactionId', transactionId)
        .toHttpParams()
    };
    return this.http
      .get<WorkspaceTransactionDto[]>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/GetWorkspaceFromTransaction`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new WorkspaceTransactionDto(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/LoadTestReport?batchId={batchId}
   * ID: POST-REST-Itinerary-LoadTestReport_batchId
   * HttpMethod: post
   * UrlFull: REST/Itinerary/LoadTestReport?batchId={batchId}
   * UrlVar:  Itinerary/LoadTestReport
   * ResponseType: LoadTestReport
   * UriParams:
   * - batchId:number:required
   * BodyParams:
   */
  public Itinerary_LoadTestReport(batchId: number)
    : Promise<LoadTestReport>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('batchId', batchId)
        .toHttpParams()
    };
    return this.http
      .post<LoadTestReport>(`${this.apiUrlPrefix}/Itinerary/LoadTestReport`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new LoadTestReport(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/LockTransaction/{transactionId}
   * ID: POST-REST-Itinerary-AgentDesk-LockTransaction-transactionId
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/LockTransaction/{transactionId}
   * UrlVar:  Itinerary/AgentDesk/LockTransaction/${transactionId}
   * ResponseType: boolean
   * UriParams:
   * - transactionId:number:required
   * BodyParams:
   */
  public Itinerary_LockTransaction(transactionId: number)
    : Promise<boolean>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('transactionId', transactionId)
        .toHttpParams()
    };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/LockTransaction/${transactionId}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/{itineraryId}/MissingInfo
   * ID: POST-REST-Itinerary-AgentDesk-itineraryId-MissingInfo
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/{itineraryId}/MissingInfo
   * UrlVar:  Itinerary/AgentDesk/${itineraryId}/MissingInfo
   * ResponseType: void
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   * - request:ParserSpeakCliDto:required
   */
  public Itinerary_MissingInfo(itineraryId: string, request: ParserSpeakCliDto)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/${itineraryId}/MissingInfo`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/ParserSpeakTest
   * ID: POST-REST-Itinerary-AgentDesk-ParserSpeakTest
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/ParserSpeakTest
   * UrlVar:  Itinerary/AgentDesk/ParserSpeakTest
   * ResponseType: string
   * UriParams:
   * BodyParams:
   * - request:ParserSpeakCliDto:required
   */
  public Itinerary_ParserSpeakTest(request: ParserSpeakCliDto)
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .post<string>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/ParserSpeakTest`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/PickupCall?transactionId={transactionId}&phoneNumber={phoneNumber}
   * ID: POST-REST-Itinerary-AgentDesk-PickupCall_transactionId_phoneNumber
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/PickupCall?transactionId={transactionId}&phoneNumber={phoneNumber}
   * UrlVar:  Itinerary/AgentDesk/PickupCall
   * ResponseType: void
   * UriParams:
   * - transactionId:number:required
   * - phoneNumber:string:required
   * BodyParams:
   */
  public Itinerary_PickupCall(transactionId: number, phoneNumber: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('transactionId', transactionId)
        .set('phoneNumber', phoneNumber)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/PickupCall`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/Request
   * ID: POST-REST-Itinerary-Request
   * HttpMethod: post
   * UrlFull: REST/Itinerary/Request
   * UrlVar:  Itinerary/Request
   * ResponseType: string
   * UriParams:
   * BodyParams:
   * - request:AmexSearchRequest:required
   */
  public Itinerary_ProcessAmexRequest(request: AmexSearchRequest)
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .post<string>(`${this.apiUrlPrefix}/Itinerary/Request`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/Request/{itineraryId}
   * ID: GET-REST-Itinerary-Request-itineraryId
   * HttpMethod: get
   * UrlFull: REST/Itinerary/Request/{itineraryId}
   * UrlVar:  Itinerary/Request/${itineraryId}
   * ResponseType: ResponseDto
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_ProcessAmexRequest_2(itineraryId: string)
    : Promise<ResponseDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<ResponseDto>(`${this.apiUrlPrefix}/Itinerary/Request/${itineraryId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ResponseDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/Request/{itineraryId}/status
   * ID: GET-REST-Itinerary-Request-itineraryId-status
   * HttpMethod: get
   * UrlFull: REST/Itinerary/Request/{itineraryId}/status
   * UrlVar:  Itinerary/Request/${itineraryId}/status
   * ResponseType: AmexItineraryStatusRequest
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_ProcessItineraryStatusRequest(itineraryId: string)
    : Promise<AmexItineraryStatusRequest>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<AmexItineraryStatusRequest>(`${this.apiUrlPrefix}/Itinerary/Request/${itineraryId}/status`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new AmexItineraryStatusRequest(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/Request/{itineraryId}/Agent/push
   * ID: POST-REST-Itinerary-Request-itineraryId-Agent-push
   * HttpMethod: post
   * UrlFull: REST/Itinerary/Request/{itineraryId}/Agent/push
   * UrlVar:  Itinerary/Request/${itineraryId}/Agent/push
   * ResponseType: void
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_PushItineraryStatusRequest(itineraryId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Itinerary/Request/${itineraryId}/Agent/push`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/{itineraryId}
   * ID: PUT-REST-Itinerary-itineraryId
   * HttpMethod: put
   * UrlFull: REST/Itinerary/{itineraryId}
   * UrlVar:  Itinerary/${itineraryId}
   * ResponseType: void
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   * - request:SolutionRequest:required
   */
  public Itinerary_PUT(itineraryId: string, request: SolutionRequest)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Itinerary/${itineraryId}`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/RealtimeReport
   * ID: POST-REST-Itinerary-RealtimeReport
   * HttpMethod: post
   * UrlFull: REST/Itinerary/RealtimeReport
   * UrlVar:  Itinerary/RealtimeReport
   * ResponseType: LoadTestReport
   * UriParams:
   * BodyParams:
   * - request:RealtimeReportRequest:required
   */
  public Itinerary_RealtimeReport(request: RealtimeReportRequest)
    : Promise<LoadTestReport>
  {
    let options = { headers: this.headers };
    return this.http
      .post<LoadTestReport>(`${this.apiUrlPrefix}/Itinerary/RealtimeReport`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new LoadTestReport(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/{itineraryId}/Recreate
   * ID: POST-REST-Itinerary-AgentDesk-itineraryId-Recreate
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/{itineraryId}/Recreate
   * UrlVar:  Itinerary/AgentDesk/${itineraryId}/Recreate
   * ResponseType: ItineraryReviewDto
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   * - request:ParserSpeakCliDto:required
   */
  public Itinerary_RecreateNetworkFromParserData(itineraryId: string, request: ParserSpeakCliDto)
    : Promise<ItineraryReviewDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<ItineraryReviewDto>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/${itineraryId}/Recreate`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ItineraryReviewDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/{itineraryId}
   * ID: POST-REST-Itinerary-AgentDesk-itineraryId
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/{itineraryId}
   * UrlVar:  Itinerary/AgentDesk/${itineraryId}
   * ResponseType: ItineraryReviewDto
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   * - newQuery:string:required
   */
  public Itinerary_RecreateNetworkV1(itineraryId: string, newQuery: string)
    : Promise<ItineraryReviewDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<ItineraryReviewDto>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/${itineraryId}`, JSON.stringify(newQuery), options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ItineraryReviewDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/Refresh/{itineraryId}
   * ID: PUT-REST-Itinerary-Refresh-itineraryId
   * HttpMethod: put
   * UrlFull: REST/Itinerary/Refresh/{itineraryId}
   * UrlVar:  Itinerary/Refresh/${itineraryId}
   * ResponseType: ResponseDto
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_Refresh(itineraryId: string)
    : Promise<ResponseDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .put<ResponseDto>(`${this.apiUrlPrefix}/Itinerary/Refresh/${itineraryId}`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ResponseDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/Itinerary/Trips?removeAll={removeAll}
   * ID: DELETE-REST-Itinerary-Trips_removeAll
   * HttpMethod: delete
   * UrlFull: REST/Itinerary/Trips?removeAll={removeAll}
   * UrlVar:  Itinerary/Trips
   * ResponseType: boolean
   * UriParams:
   * - removeAll:boolean:optional
   * BodyParams:
   * - itineraryIds:string[]:required
   */
  public Itinerary_RemoveTrips(itineraryIds: string[], removeAll?: boolean)
    : Promise<boolean>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('removeAll', removeAll)
        .toHttpParams(),
      body: itineraryIds
    };
    return this.http
      .delete<boolean>(`${this.apiUrlPrefix}/Itinerary/Trips`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/{itineraryId}/reset
   * ID: POST-REST-Itinerary-itineraryId-reset
   * HttpMethod: post
   * UrlFull: REST/Itinerary/{itineraryId}/reset
   * UrlVar:  Itinerary/${itineraryId}/reset
   * ResponseType: void
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_ResetItinerary(itineraryId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Itinerary/${itineraryId}/reset`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/{itineraryId}/Notes
   * ID: POST-REST-Itinerary-AgentDesk-itineraryId-Notes
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/{itineraryId}/Notes
   * UrlVar:  Itinerary/AgentDesk/${itineraryId}/Notes
   * ResponseType: void
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   * - notes:string:required
   */
  public Itinerary_SaveItineraryNotes(itineraryId: string, notes: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/${itineraryId}/Notes`, JSON.stringify(notes), options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/{itineraryId}/Schedule
   * ID: POST-REST-Itinerary-AgentDesk-itineraryId-Schedule
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/{itineraryId}/Schedule
   * UrlVar:  Itinerary/AgentDesk/${itineraryId}/Schedule
   * ResponseType: ResponseDto
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_Schedule(itineraryId: string)
    : Promise<ResponseDto>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .post<ResponseDto>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/${itineraryId}/Schedule`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ResponseDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/V2
   * ID: POST-REST-Itinerary-V2
   * HttpMethod: post
   * UrlFull: REST/Itinerary/V2
   * UrlVar:  Itinerary/V2
   * ResponseType: ResponseDto
   * UriParams:
   * BodyParams:
   * - request:CNCRequest:required
   */
  public Itinerary_SearchV2(request: CNCRequest)
    : Promise<ResponseDto>
  {
    let options = { headers: this.headers };
    return this.http
      .post<ResponseDto>(`${this.apiUrlPrefix}/Itinerary/V2`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ResponseDto(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/Review/{reviewId}/Process
   * ID: PUT-REST-Itinerary-Review-reviewId-Process
   * HttpMethod: put
   * UrlFull: REST/Itinerary/Review/{reviewId}/Process
   * UrlVar:  Itinerary/Review/${reviewId}/Process
   * ResponseType: void
   * UriParams:
   * - reviewId:number:required
   * BodyParams:
   */
  public Itinerary_SetIsProcessedReview(reviewId: number)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('reviewId', reviewId)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Itinerary/Review/${reviewId}/Process`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/Resolutions?e={e}&iid={iid}
   * ID: PUT-REST-Itinerary-Resolutions_e_iid
   * HttpMethod: put
   * UrlFull: REST/Itinerary/Resolutions?e={e}&iid={iid}
   * UrlVar:  Itinerary/Resolutions
   * ResponseType: void
   * UriParams:
   * - e:string:required
   * - iid:string:required
   * BodyParams:
   * - resolutionAnswers:NetworkResolution[]:required
   */
  public Itinerary_SetResolutionAnswers(e: string, iid: string, resolutionAnswers: NetworkResolution[])
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('e', e)
        .set('iid', iid)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Itinerary/Resolutions`, resolutionAnswers, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/Review
   * ID: PUT-REST-Itinerary-Review
   * HttpMethod: put
   * UrlFull: REST/Itinerary/Review
   * UrlVar:  Itinerary/Review
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - review:SearchQueryLog:required
   */
  public Itinerary_SetReview(review: SearchQueryLog)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Itinerary/Review`, review, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Temporary Endpoint to test the AgentDesk Report Objects
   * URL: POST REST/Itinerary/AgentDesk/StartReportPeriod
   * ID: POST-REST-Itinerary-AgentDesk-StartReportPeriod
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/StartReportPeriod
   * UrlVar:  Itinerary/AgentDesk/StartReportPeriod
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - startTime:Date:required
   */
  public Itinerary_StartReportPeriod(startTime: Date)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/StartReportPeriod`, startTime, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/Undo/{itineraryId}
   * ID: PUT-REST-Itinerary-Undo-itineraryId
   * HttpMethod: put
   * UrlFull: REST/Itinerary/Undo/{itineraryId}
   * UrlVar:  Itinerary/Undo/${itineraryId}
   * ResponseType: void
   * UriParams:
   * - itineraryId:string:required
   * BodyParams:
   */
  public Itinerary_UndoChanges(itineraryId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Itinerary/Undo/${itineraryId}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/UnlockTransactions/{skipTransactionId}
   * ID: POST-REST-Itinerary-AgentDesk-UnlockTransactions-skipTransactionId
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/UnlockTransactions/{skipTransactionId}
   * UrlVar:  Itinerary/AgentDesk/UnlockTransactions
   * ResponseType: boolean
   * UriParams:
   * - skipTransactionId:number:optional
   * BodyParams:
   */
  public Itinerary_UnlockTransactions(skipTransactionId?: number)
    : Promise<boolean>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('skipTransactionId', skipTransactionId)
        .toHttpParams()
    };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/UnlockTransactions`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/UpdateAvailability
   * ID: PUT-REST-Itinerary-UpdateAvailability
   * HttpMethod: put
   * UrlFull: REST/Itinerary/UpdateAvailability
   * UrlVar:  Itinerary/UpdateAvailability
   * ResponseType: UpdateAvailablilityResponse
   * UriParams:
   * BodyParams:
   * - parameters:DirectSellRequest:required
   */
  public Itinerary_UpdateAvailability(parameters: DirectSellRequest)
    : Promise<UpdateAvailablilityResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .put<UpdateAvailablilityResponse>(`${this.apiUrlPrefix}/Itinerary/UpdateAvailability`, parameters, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UpdateAvailablilityResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/AgentDesk/UpdateItineraryAgent
   * ID: POST-REST-Itinerary-AgentDesk-UpdateItineraryAgent
   * HttpMethod: post
   * UrlFull: REST/Itinerary/AgentDesk/UpdateItineraryAgent
   * UrlVar:  Itinerary/AgentDesk/UpdateItineraryAgent
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - req:UpdateItineraryAgentRequest:required
   */
  public Itinerary_UpdateItineraryAgent(req: UpdateItineraryAgentRequest)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/UpdateItineraryAgent`, req, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/AgentDesk/UpdateItineraryQa/{itineraryId}?status={status}
   * ID: PUT-REST-Itinerary-AgentDesk-UpdateItineraryQa-itineraryId_status
   * HttpMethod: put
   * UrlFull: REST/Itinerary/AgentDesk/UpdateItineraryQa/{itineraryId}?status={status}
   * UrlVar:  Itinerary/AgentDesk/UpdateItineraryQa/${itineraryId}
   * ResponseType: boolean
   * UriParams:
   * - itineraryId:string:required
   * - status:ItineraryState:required
   * BodyParams:
   */
  public Itinerary_UpdateItineraryQa(itineraryId: string, status: ItineraryState)
    : Promise<boolean>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .setAsStr('status', status)
        .toHttpParams()
    };
    return this.http
      .put<boolean>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/UpdateItineraryQa/${itineraryId}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/Itinerary/AgentDesk/UpdateTransaction/{transactionId}?status={status}
   * ID: PUT-REST-Itinerary-AgentDesk-UpdateTransaction-transactionId_status
   * HttpMethod: put
   * UrlFull: REST/Itinerary/AgentDesk/UpdateTransaction/{transactionId}?status={status}
   * UrlVar:  Itinerary/AgentDesk/UpdateTransaction/${transactionId}
   * ResponseType: void
   * UriParams:
   * - transactionId:number:required
   * - status:TransactionState:required
   * BodyParams:
   */
  public Itinerary_UpdateTransaction(transactionId: number, status: TransactionState)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('transactionId', transactionId)
        .setAsStr('status', status)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/UpdateTransaction/${transactionId}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/WebStatic?iid={iid}
   * ID: GET-REST-Itinerary-WebStatic_iid
   * HttpMethod: get
   * UrlFull: REST/Itinerary/WebStatic?iid={iid}
   * UrlVar:  Itinerary/WebStatic
   * ResponseType: any
   * UriParams:
   * - iid:string:required
   * BodyParams:
   */
  public Itinerary_WebStatic(iid: string)
    : Promise<any>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('iid', iid)
        .toHttpParams()
    };
    return this.http
      .get<any>(`${this.apiUrlPrefix}/Itinerary/WebStatic`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Itinerary/AgentDesk/WebStatic?iid={iid}
   * ID: GET-REST-Itinerary-AgentDesk-WebStatic_iid
   * HttpMethod: get
   * UrlFull: REST/Itinerary/AgentDesk/WebStatic?iid={iid}
   * UrlVar:  Itinerary/AgentDesk/WebStatic
   * ResponseType: any
   * UriParams:
   * - iid:string:required
   * BodyParams:
   */
  public Itinerary_WebStatic_2(iid: string)
    : Promise<any>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('iid', iid)
        .toHttpParams()
    };
    return this.http
      .get<any>(`${this.apiUrlPrefix}/Itinerary/AgentDesk/WebStatic`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Itinerary/WernickeScan
   * ID: POST-REST-Itinerary-WernickeScan
   * HttpMethod: post
   * UrlFull: REST/Itinerary/WernickeScan
   * UrlVar:  Itinerary/WernickeScan
   * ResponseType: WernickeResponse
   * UriParams:
   * BodyParams:
   * - request:string:required
   */
  public Itinerary_WernickeScan(request: string)
    : Promise<WernickeResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .post<WernickeResponse>(`${this.apiUrlPrefix}/Itinerary/WernickeScan`, JSON.stringify(request), options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new WernickeResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Returns a dictionary of message strings selected by language and platform
   * URL: GET REST/Localization/ErrorMessages?languageCode={languageCode}&cultureCode={cultureCode}&platformId={platformId}
   * ID: GET-REST-Localization-ErrorMessages_languageCode_cultureCode_platformId
   * HttpMethod: get
   * UrlFull: REST/Localization/ErrorMessages?languageCode={languageCode}&cultureCode={cultureCode}&platformId={platformId}
   * UrlVar:  Localization/ErrorMessages
   * ResponseType: { [id: string]: LocalizeMessageResponse; }
   * UriParams:
   * - languageCode:NaturalLanguage:optional
   * - cultureCode:Culture:optional
   * - platformId:Platform:optional
   * BodyParams:
   */
  public LocalizedMessage_GetTranslations(languageCode?: NaturalLanguage, cultureCode?: Culture, platformId?: Platform)
    : Promise<{ [id: string]: LocalizeMessageResponse; }>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('languageCode', languageCode)
        .setAsStr('cultureCode', cultureCode)
        .setAsStr('platformId', platformId)
        .toHttpParams()
    };
    return this.http
      .get<{ [id: string]: LocalizeMessageResponse; }>(`${this.apiUrlPrefix}/Localization/ErrorMessages`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.mapValues(response, x => x ? new LocalizeMessageResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Microsite/survey
   * ID: POST-REST-Microsite-survey
   * HttpMethod: post
   * UrlFull: REST/Microsite/survey
   * UrlVar:  Microsite/survey
   * ResponseType: number
   * UriParams:
   * BodyParams:
   * - input:MicrositeSurveyHubSpot:required
   */
  public Microsite_PostmicrositSurvey(input: MicrositeSurveyHubSpot)
    : Promise<number>
  {
    let options = { headers: this.headers };
    return this.http
      .post<number>(`${this.apiUrlPrefix}/Microsite/survey`, input, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Policy/CreatePolicy
   * ID: POST-REST-Policy-CreatePolicy
   * HttpMethod: post
   * UrlFull: REST/Policy/CreatePolicy
   * UrlVar:  Policy/CreatePolicy
   * ResponseType: number
   * UriParams:
   * BodyParams:
   * - Policy:Policy:required
   */
  public Policy_CreatePolicy(Policy: Policy)
    : Promise<number>
  {
    let options = { headers: this.headers };
    return this.http
      .post<number>(`${this.apiUrlPrefix}/Policy/CreatePolicy`, Policy, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Policy/GetDomain/{category}
   * ID: GET-REST-Policy-GetDomain-category
   * HttpMethod: get
   * UrlFull: REST/Policy/GetDomain/{category}
   * UrlVar:  Policy/GetDomain/${category}
   * ResponseType: DomainItem[]
   * UriParams:
   * - category:FlightRankingCategory:required
   * BodyParams:
   */
  public Policy_GetDomain(category: FlightRankingCategory)
    : Promise<DomainItem[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('category', category)
        .toHttpParams()
    };
    return this.http
      .get<DomainItem[]>(`${this.apiUrlPrefix}/Policy/GetDomain/${category}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new DomainItem(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Policy/GetPolicy
   * ID: GET-REST-Policy-GetPolicy
   * HttpMethod: get
   * UrlFull: REST/Policy/GetPolicy
   * UrlVar:  Policy/GetPolicy
   * ResponseType: Policy[]
   * UriParams:
   * BodyParams:
   */
  public Policy_GetPolicy()
    : Promise<Policy[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<Policy[]>(`${this.apiUrlPrefix}/Policy/GetPolicy`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new Policy(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Policy/SearchUsers/{query}
   * ID: GET-REST-Policy-SearchUsers-query
   * HttpMethod: get
   * UrlFull: REST/Policy/SearchUsers/{query}
   * UrlVar:  Policy/SearchUsers/${query}
   * ResponseType: UserProfile[]
   * UriParams:
   * - query:string:required
   * BodyParams:
   */
  public Policy_SearchUsers(query: string)
    : Promise<UserProfile[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('query', query)
        .toHttpParams()
    };
    return this.http
      .get<UserProfile[]>(`${this.apiUrlPrefix}/Policy/SearchUsers/${query}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new UserProfile(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get Price Totals for a Solution
   * URL: GET REST/PriceTotals/{solutionId}
   * ID: GET-REST-PriceTotals-solutionId
   * HttpMethod: get
   * UrlFull: REST/PriceTotals/{solutionId}
   * UrlVar:  PriceTotals/${solutionId}
   * ResponseType: PriceTotals
   * UriParams:
   * - solutionId:string:required
   * BodyParams:
   */
  public PriceTotals_PriceTotals(solutionId: string)
    : Promise<PriceTotals>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solutionId', solutionId)
        .toHttpParams()
    };
    return this.http
      .get<PriceTotals>(`${this.apiUrlPrefix}/PriceTotals/${solutionId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new PriceTotals(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/PushNotifications/Disable
   * ID: POST-REST-PushNotifications-Disable
   * HttpMethod: post
   * UrlFull: REST/PushNotifications/Disable
   * UrlVar:  PushNotifications/Disable
   * ResponseType: void
   * UriParams:
   * BodyParams:
   */
  public PushNotifications_DisablePushNotifications()
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/PushNotifications/Disable`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/PushNotifications/Enable/{notificationToken}
   * ID: POST-REST-PushNotifications-Enable-notificationToken
   * HttpMethod: post
   * UrlFull: REST/PushNotifications/Enable/{notificationToken}
   * UrlVar:  PushNotifications/Enable/${notificationToken}
   * ResponseType: void
   * UriParams:
   * - notificationToken:string:required
   * BodyParams:
   */
  public PushNotifications_EnablePushNotifications(notificationToken: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('notificationToken', notificationToken)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/PushNotifications/Enable/${notificationToken}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/PushNotifications/UpdateBadgeValue/{count}
   * ID: POST-REST-PushNotifications-UpdateBadgeValue-count
   * HttpMethod: post
   * UrlFull: REST/PushNotifications/UpdateBadgeValue/{count}
   * UrlVar:  PushNotifications/UpdateBadgeValue/${count}
   * ResponseType: void
   * UriParams:
   * - count:number:required
   * BodyParams:
   */
  public PushNotifications_UpdateBadgeValue(count: number)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('count', count)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/PushNotifications/UpdateBadgeValue/${count}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Session/Anonymous/{deviceId}/{connectionId}
   * ID: POST-REST-Session-Anonymous-deviceId-connectionId
   * HttpMethod: post
   * UrlFull: REST/Session/Anonymous/{deviceId}/{connectionId}
   * UrlVar:  Session/Anonymous
   * ResponseType: SessionToken
   * UriParams:
   * - deviceId:string:optional
   * - connectionId:string:optional
   * BodyParams:
   */
  public Session_AnonymousAuthentication(deviceId?: string, connectionId?: string)
    : Promise<SessionToken>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('deviceId', deviceId)
        .set('connectionId', connectionId)
        .toHttpParams()
    };
    return this.http
      .post<SessionToken>(`${this.apiUrlPrefix}/Session/Anonymous`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SessionToken(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Session/External
   * ID: POST-REST-Session-External
   * HttpMethod: post
   * UrlFull: REST/Session/External
   * UrlVar:  Session/External
   * ResponseType: SessionToken
   * UriParams:
   * BodyParams:
   * - externalLoginRequest:ExternalLoginRequest:required
   */
  public Session_ExternalLogin(externalLoginRequest: ExternalLoginRequest)
    : Promise<SessionToken>
  {
    let options = { headers: this.headers };
    return this.http
      .post<SessionToken>(`${this.apiUrlPrefix}/Session/External`, externalLoginRequest, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SessionToken(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Session
   * ID: POST-REST-Session
   * HttpMethod: post
   * UrlFull: REST/Session
   * UrlVar:  Session
   * ResponseType: SessionToken
   * UriParams:
   * BodyParams:
   * - loginRequest:LoginRequest:required
   */
  public Session_Login(loginRequest: LoginRequest)
    : Promise<SessionToken>
  {
    let options = { headers: this.headers };
    return this.http
      .post<SessionToken>(`${this.apiUrlPrefix}/Session`, loginRequest, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SessionToken(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/Session
   * ID: DELETE-REST-Session
   * HttpMethod: delete
   * UrlFull: REST/Session
   * UrlVar:  Session
   * ResponseType: void
   * UriParams:
   * BodyParams:
   */
  public Session_Logout()
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/Session`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Session/Service
   * ID: POST-REST-Session-Service
   * HttpMethod: post
   * UrlFull: REST/Session/Service
   * UrlVar:  Session/Service
   * ResponseType: SessionToken
   * UriParams:
   * BodyParams:
   * - loginRequest:LoginRequest:required
   */
  public Session_ServiceLogin(loginRequest: LoginRequest)
    : Promise<SessionToken>
  {
    let options = { headers: this.headers };
    return this.http
      .post<SessionToken>(`${this.apiUrlPrefix}/Session/Service`, loginRequest, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SessionToken(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Simulation/AddQa?qty={qty}
   * ID: GET-REST-Simulation-AddQa_qty
   * HttpMethod: get
   * UrlFull: REST/Simulation/AddQa?qty={qty}
   * UrlVar:  Simulation/AddQa
   * ResponseType: void
   * UriParams:
   * - qty:number:optional
   * BodyParams:
   */
  public Simulation_AddQa(qty?: number)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('qty', qty)
        .toHttpParams()
    };
    return this.http
      .get<void>(`${this.apiUrlPrefix}/Simulation/AddQa`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Simulation/AddQaItinerary?id={id}
   * ID: GET-REST-Simulation-AddQaItinerary_id
   * HttpMethod: get
   * UrlFull: REST/Simulation/AddQaItinerary?id={id}
   * UrlVar:  Simulation/AddQaItinerary
   * ResponseType: void
   * UriParams:
   * - id:string:required
   * BodyParams:
   */
  public Simulation_AddQaItinerary(id: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('id', id)
        .toHttpParams()
    };
    return this.http
      .get<void>(`${this.apiUrlPrefix}/Simulation/AddQaItinerary`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Simulation/RemoveQa?qty={qty}
   * ID: GET-REST-Simulation-RemoveQa_qty
   * HttpMethod: get
   * UrlFull: REST/Simulation/RemoveQa?qty={qty}
   * UrlVar:  Simulation/RemoveQa
   * ResponseType: void
   * UriParams:
   * - qty:number:optional
   * BodyParams:
   */
  public Simulation_RemoveQa(qty?: number)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('qty', qty)
        .toHttpParams()
    };
    return this.http
      .get<void>(`${this.apiUrlPrefix}/Simulation/RemoveQa`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Simulation/Run
   * ID: POST-REST-Simulation-Run
   * HttpMethod: post
   * UrlFull: REST/Simulation/Run
   * UrlVar:  Simulation/Run
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - request:StartSimulationRequest:required
   */
  public Simulation_Run(request: StartSimulationRequest)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Simulation/Run`, request, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Simulation/Status
   * ID: GET-REST-Simulation-Status
   * HttpMethod: get
   * UrlFull: REST/Simulation/Status
   * UrlVar:  Simulation/Status
   * ResponseType: SystemStatus
   * UriParams:
   * BodyParams:
   */
  public Simulation_Status()
    : Promise<SystemStatus>
  {
    let options = { headers: this.headers };
    return this.http
      .get<SystemStatus>(`${this.apiUrlPrefix}/Simulation/Status`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SystemStatus(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Simulation/Stop
   * ID: GET-REST-Simulation-Stop
   * HttpMethod: get
   * UrlFull: REST/Simulation/Stop
   * UrlVar:  Simulation/Stop
   * ResponseType: SystemStatus
   * UriParams:
   * BodyParams:
   */
  public Simulation_Stop()
    : Promise<SystemStatus>
  {
    let options = { headers: this.headers };
    return this.http
      .get<SystemStatus>(`${this.apiUrlPrefix}/Simulation/Stop`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SystemStatus(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get list of all the countries.
   * URL: GET REST/Statics/AllCountries
   * ID: GET-REST-Statics-AllCountries
   * HttpMethod: get
   * UrlFull: REST/Statics/AllCountries
   * UrlVar:  Statics/AllCountries
   * ResponseType: CountryDTO[]
   * UriParams:
   * BodyParams:
   */
  public Statics_AllCountries()
    : Promise<CountryDTO[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<CountryDTO[]>(`${this.apiUrlPrefix}/Statics/AllCountries`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CountryDTO(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Statics/CityAutoComplete
   * ID: POST-REST-Statics-CityAutoComplete
   * HttpMethod: post
   * UrlFull: REST/Statics/CityAutoComplete
   * UrlVar:  Statics/CityAutoComplete
   * ResponseType: string[]
   * UriParams:
   * BodyParams:
   * - autocomplete:InputCityAutocomplete:required
   */
  public Statics_CityAutoComplete(autocomplete: InputCityAutocomplete)
    : Promise<string[]>
  {
    let options = { headers: this.headers };
    return this.http
      .post<string[]>(`${this.apiUrlPrefix}/Statics/CityAutoComplete`, autocomplete, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Statics/CityInfo
   * ID: POST-REST-Statics-CityInfo
   * HttpMethod: post
   * UrlFull: REST/Statics/CityInfo
   * UrlVar:  Statics/CityInfo
   * ResponseType: CityInfoDTO[]
   * UriParams:
   * BodyParams:
   * - autocomplete:InputCityAutocomplete:required
   */
  public Statics_CityInfo(autocomplete: InputCityAutocomplete)
    : Promise<CityInfoDTO[]>
  {
    let options = { headers: this.headers };
    return this.http
      .post<CityInfoDTO[]>(`${this.apiUrlPrefix}/Statics/CityInfo`, autocomplete, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CityInfoDTO(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get Country and Code.
   * URL: POST REST/Statics/country
   * ID: POST-REST-Statics-country
   * HttpMethod: post
   * UrlFull: REST/Statics/country
   * UrlVar:  Statics/country
   * ResponseType: CountryDTO
   * UriParams:
   * BodyParams:
   * - input:InputDTOCode:required
   */
  public Statics_country(input: InputDTOCode)
    : Promise<CountryDTO>
  {
    let options = { headers: this.headers };
    return this.http
      .post<CountryDTO>(`${this.apiUrlPrefix}/Statics/country`, input, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CountryDTO(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get a list of address types.
   * URL: GET REST/Statics/GetAddressType
   * ID: GET-REST-Statics-GetAddressType
   * HttpMethod: get
   * UrlFull: REST/Statics/GetAddressType
   * UrlVar:  Statics/GetAddressType
   * ResponseType: AddressTypeDTO[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetAddressTypeList()
    : Promise<AddressTypeDTO[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<AddressTypeDTO[]>(`${this.apiUrlPrefix}/Statics/GetAddressType`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new AddressTypeDTO(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/AllAirlinePointsPrograms
   * ID: GET-REST-Statics-AllAirlinePointsPrograms
   * HttpMethod: get
   * UrlFull: REST/Statics/AllAirlinePointsPrograms
   * UrlVar:  Statics/AllAirlinePointsPrograms
   * ResponseType: AirlinePointsProgram[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetAirlinePointsPrograms()
    : Promise<AirlinePointsProgram[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<AirlinePointsProgram[]>(`${this.apiUrlPrefix}/Statics/AllAirlinePointsPrograms`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new AirlinePointsProgram(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/Airports
   * ID: GET-REST-Statics-Airports
   * HttpMethod: get
   * UrlFull: REST/Statics/Airports
   * UrlVar:  Statics/Airports
   * ResponseType: AirportInfo[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetAirportInfos()
    : Promise<AirportInfo[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<AirportInfo[]>(`${this.apiUrlPrefix}/Statics/Airports`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new AirportInfo(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get a list of all the provinces.
   * URL: GET REST/Statics/AllProvinces
   * ID: GET-REST-Statics-AllProvinces
   * HttpMethod: get
   * UrlFull: REST/Statics/AllProvinces
   * UrlVar:  Statics/AllProvinces
   * ResponseType: ProvinceDTO[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetAllProvince()
    : Promise<ProvinceDTO[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<ProvinceDTO[]>(`${this.apiUrlPrefix}/Statics/AllProvinces`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new ProvinceDTO(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/booking/Currency
   * ID: GET-REST-booking-Currency
   * HttpMethod: get
   * UrlFull: REST/booking/Currency
   * UrlVar:  booking/Currency
   * ResponseType: string
   * UriParams:
   * BodyParams:
   */
  public Statics_GetBookingCurrency()
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .get<string>(`${this.apiUrlPrefix}/booking/Currency`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get lists honorifics (titles), credit card types, and countries.
   * URL: GET REST/Statics/BookingOptions
   * ID: GET-REST-Statics-BookingOptions
   * HttpMethod: get
   * UrlFull: REST/Statics/BookingOptions
   * UrlVar:  Statics/BookingOptions
   * ResponseType: BookingOptions
   * UriParams:
   * BodyParams:
   */
  public Statics_GetBookingOptions()
    : Promise<BookingOptions>
  {
    let options = { headers: this.headers };
    return this.http
      .get<BookingOptions>(`${this.apiUrlPrefix}/Statics/BookingOptions`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new BookingOptions(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/RelationshipTypes
   * ID: GET-REST-Statics-RelationshipTypes
   * HttpMethod: get
   * UrlFull: REST/Statics/RelationshipTypes
   * UrlVar:  Statics/RelationshipTypes
   * ResponseType: CompanionRelationshipType[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetCompanionRelationshipTypes()
    : Promise<CompanionRelationshipType[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<CompanionRelationshipType[]>(`${this.apiUrlPrefix}/Statics/RelationshipTypes`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new CompanionRelationshipType(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get a list of equipment types.
   * URL: GET REST/Statics/GetEquipment
   * ID: GET-REST-Statics-GetEquipment
   * HttpMethod: get
   * UrlFull: REST/Statics/GetEquipment
   * UrlVar:  Statics/GetEquipment
   * ResponseType: AirEquipmentDTO[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetEquipmentList()
    : Promise<AirEquipmentDTO[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<AirEquipmentDTO[]>(`${this.apiUrlPrefix}/Statics/GetEquipment`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new AirEquipmentDTO(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/FrequetFlyerProgramCodes
   * ID: GET-REST-Statics-FrequetFlyerProgramCodes
   * HttpMethod: get
   * UrlFull: REST/Statics/FrequetFlyerProgramCodes
   * UrlVar:  Statics/FrequetFlyerProgramCodes
   * ResponseType: { [id: string]: string; }
   * UriParams:
   * BodyParams:
   */
  public Statics_GetFrequentFlyerProgramCodes()
    : Promise<{ [id: string]: string; }>
  {
    let options = { headers: this.headers };
    return this.http
      .get<{ [id: string]: string; }>(`${this.apiUrlPrefix}/Statics/FrequetFlyerProgramCodes`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get provinces by a country code.
   * URL: GET REST/Statics/GetProvinceByCountryCode?countryCode={countryCode}
   * ID: GET-REST-Statics-GetProvinceByCountryCode_countryCode
   * HttpMethod: get
   * UrlFull: REST/Statics/GetProvinceByCountryCode?countryCode={countryCode}
   * UrlVar:  Statics/GetProvinceByCountryCode
   * ResponseType: ProvinceDTO[]
   * UriParams:
   * - countryCode:string:optional
   * BodyParams:
   */
  public Statics_GetProvinceByCountryCode(countryCode?: string)
    : Promise<ProvinceDTO[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('countryCode', countryCode)
        .toHttpParams()
    };
    return this.http
      .get<ProvinceDTO[]>(`${this.apiUrlPrefix}/Statics/GetProvinceByCountryCode`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new ProvinceDTO(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/SSR
   * ID: GET-REST-Statics-SSR
   * HttpMethod: get
   * UrlFull: REST/Statics/SSR
   * UrlVar:  Statics/SSR
   * ResponseType: KeyValue[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetSSRs()
    : Promise<KeyValue[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<KeyValue[]>(`${this.apiUrlPrefix}/Statics/SSR`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new KeyValue(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/SystemStatus
   * ID: GET-REST-Statics-SystemStatus
   * HttpMethod: get
   * UrlFull: REST/Statics/SystemStatus
   * UrlVar:  Statics/SystemStatus
   * ResponseType: string
   * UriParams:
   * BodyParams:
   */
  public Statics_GetSystemStatus()
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .get<string>(`${this.apiUrlPrefix}/Statics/SystemStatus`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/UserTypes
   * ID: GET-REST-Statics-UserTypes
   * HttpMethod: get
   * UrlFull: REST/Statics/UserTypes
   * UrlVar:  Statics/UserTypes
   * ResponseType: UserType[]
   * UriParams:
   * BodyParams:
   */
  public Statics_GetUserTypes()
    : Promise<UserType[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<UserType[]>(`${this.apiUrlPrefix}/Statics/UserTypes`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new UserType(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Statics/WebVersion
   * ID: GET-REST-Statics-WebVersion
   * HttpMethod: get
   * UrlFull: REST/Statics/WebVersion
   * UrlVar:  Statics/WebVersion
   * ResponseType: string
   * UriParams:
   * BodyParams:
   */
  public Statics_GetWebVersion()
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .get<string>(`${this.apiUrlPrefix}/Statics/WebVersion`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get all the provinces by country code
   * URL: POST REST/Statics/provincebycode
   * ID: POST-REST-Statics-provincebycode
   * HttpMethod: post
   * UrlFull: REST/Statics/provincebycode
   * UrlVar:  Statics/provincebycode
   * ResponseType: ProvinceDTO
   * UriParams:
   * BodyParams:
   * - input:InputDTOCode:required
   */
  public Statics_PostProvinceByCode(input: InputDTOCode)
    : Promise<ProvinceDTO>
  {
    let options = { headers: this.headers };
    return this.http
      .post<ProvinceDTO>(`${this.apiUrlPrefix}/Statics/provincebycode`, input, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new ProvinceDTO(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/Statics/WebVersion?webVersion={webVersion}&secret={secret}
   * ID: POST-REST-Statics-WebVersion_webVersion_secret
   * HttpMethod: post
   * UrlFull: REST/Statics/WebVersion?webVersion={webVersion}&secret={secret}
   * UrlVar:  Statics/WebVersion
   * ResponseType: void
   * UriParams:
   * - webVersion:string:required
   * - secret:string:required
   * BodyParams:
   */
  public Statics_PostWebVersion(webVersion: string, secret: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('webVersion', webVersion)
        .set('secret', secret)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/Statics/WebVersion`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET Status
   * ID: GET-Status
   * HttpMethod: get
   * UrlFull: Status
   * UrlVar:  Status
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   */
  public Status_GET()
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .get<boolean>(`${this.apiUrlPrefix}/Status`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET Status/AllServices
   * ID: GET-Status-AllServices
   * HttpMethod: get
   * UrlFull: Status/AllServices
   * UrlVar:  Status/AllServices
   * ResponseType: { [id: string]: boolean; }
   * UriParams:
   * BodyParams:
   */
  public Status_GetAllService()
    : Promise<{ [id: string]: boolean; }>
  {
    let options = { headers: this.headers };
    return this.http
      .get<{ [id: string]: boolean; }>(`${this.apiUrlPrefix}/Status/AllServices`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET Status/Details
   * ID: GET-Status-Details
   * HttpMethod: get
   * UrlFull: Status/Details
   * UrlVar:  Status/Details
   * ResponseType: StatusResponses
   * UriParams:
   * BodyParams:
   */
  public Status_GetStatus()
    : Promise<StatusResponses>
  {
    let options = { headers: this.headers };
    return this.http
      .get<StatusResponses>(`${this.apiUrlPrefix}/Status/Details`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new StatusResponses(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get all travellers who have item(s) checked out.
   * URL: GET REST/Traveler/Get/{solutionId}
   * ID: GET-REST-Traveler-Get-solutionId
   * HttpMethod: get
   * UrlFull: REST/Traveler/Get/{solutionId}
   * UrlVar:  Traveler/Get/${solutionId}
   * ResponseType: TravelerResponse[]
   * UriParams:
   * - solutionId:string:optional
   * BodyParams:
   */
  public Traveler_Get(solutionId?: string)
    : Promise<TravelerResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solutionId', solutionId)
        .toHttpParams()
    };
    return this.http
      .get<TravelerResponse[]>(`${this.apiUrlPrefix}/Traveler/Get/${solutionId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TravelerResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get all travellers in the itinerary.
   * URL: GET REST/Traveler/GetAll/{solutionId}
   * ID: GET-REST-Traveler-GetAll-solutionId
   * HttpMethod: get
   * UrlFull: REST/Traveler/GetAll/{solutionId}
   * UrlVar:  Traveler/GetAll/${solutionId}
   * ResponseType: TravelerResponse[]
   * UriParams:
   * - solutionId:string:optional
   * BodyParams:
   */
  public Traveler_GetAll(solutionId?: string)
    : Promise<TravelerResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('solutionId', solutionId)
        .toHttpParams()
    };
    return this.http
      .get<TravelerResponse[]>(`${this.apiUrlPrefix}/Traveler/GetAll/${solutionId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TravelerResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Deletes a specified travel preference profile
   * URL: DELETE REST/TravelPreference/Profiles/{travelPreferenceProfileId}
   * ID: DELETE-REST-TravelPreference-Profiles-travelPreferenceProfileId
   * HttpMethod: delete
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}
   * ResponseType: void
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * BodyParams:
   */
  public TravelPreference_DeleteTravelPreferenceProfiles(travelPreferenceProfileId: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .toHttpParams()
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a collection of ranked attributes for a requested user, travel preference profile, and category.
   * URL: GET REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes
   * ID: GET-REST-TravelPreference-Profiles-travelPreferenceProfileId-Preferences-categoryId-Attributes
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes
   * ResponseType: PreferenceAttribute[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * - categoryId:string:required
   * BodyParams:
   */
  public TravelPreference_GetAttributes(travelPreferenceProfileId: string, categoryId: string)
    : Promise<PreferenceAttribute[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .set('categoryId', categoryId)
        .toHttpParams()
    };
    return this.http
      .get<PreferenceAttribute[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceAttribute(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a collection of ranked attributes for a requested user, travel preference profile, and category.
   * URL: GET REST/TravelPreference/Profile/{travelPreferenceProfileId}/Category/{categoryId}/Attributes
   * ID: GET-REST-TravelPreference-Profile-travelPreferenceProfileId-Category-categoryId-Attributes
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profile/{travelPreferenceProfileId}/Category/{categoryId}/Attributes
   * UrlVar:  TravelPreference/Profile/${travelPreferenceProfileId}/Category/${categoryId}/Attributes
   * ResponseType: PreferenceAttribute[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * - categoryId:string:required
   * BodyParams:
   */
  public TravelPreference_GetAttributes_2(travelPreferenceProfileId: string, categoryId: string)
    : Promise<PreferenceAttribute[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .set('categoryId', categoryId)
        .toHttpParams()
    };
    return this.http
      .get<PreferenceAttribute[]>(`${this.apiUrlPrefix}/TravelPreference/Profile/${travelPreferenceProfileId}/Category/${categoryId}/Attributes`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceAttribute(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Returns the default profile templates.
   * URL: GET REST/TravelPreference/Profiles/Defaults
   * ID: GET-REST-TravelPreference-Profiles-Defaults
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profiles/Defaults
   * UrlVar:  TravelPreference/Profiles/Defaults
   * ResponseType: DefaultTravelProfile[]
   * UriParams:
   * BodyParams:
   */
  public TravelPreference_GetDefaultPreferenceProfiles()
    : Promise<DefaultTravelProfile[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<DefaultTravelProfile[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/Defaults`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new DefaultTravelProfile(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets the travel preference categories.
   * URL: GET REST/TravelPreference/Buckets
   * ID: GET-REST-TravelPreference-Buckets
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Buckets
   * UrlVar:  TravelPreference/Buckets
   * ResponseType: KeyValuePair_of_string_and_string[]
   * UriParams:
   * BodyParams:
   */
  public TravelPreference_GetTravelPreferenceCategory()
    : Promise<KeyValuePair_of_string_and_string[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<KeyValuePair_of_string_and_string[]>(`${this.apiUrlPrefix}/TravelPreference/Buckets`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new KeyValuePair_of_string_and_string(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets the name and ID of a user's specified travel preference profile.
   * URL: GET REST/TravelPreference/Profiles/{travelPreferenceProfileId}
   * ID: GET-REST-TravelPreference-Profiles-travelPreferenceProfileId
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}
   * ResponseType: TravelPreferenceResponse
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * BodyParams:
   */
  public TravelPreference_GetTravelPreferenceProfileById(travelPreferenceProfileId: string)
    : Promise<TravelPreferenceResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .toHttpParams()
    };
    return this.http
      .get<TravelPreferenceResponse>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new TravelPreferenceResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets the names and IDs of a user's travel preference profiles.
   * URL: GET REST/TravelPreference/Profiles
   * ID: GET-REST-TravelPreference-Profiles
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profiles
   * UrlVar:  TravelPreference/Profiles
   * ResponseType: TravelPreferenceResponse[]
   * UriParams:
   * BodyParams:
   */
  public TravelPreference_GetTravelPreferenceProfiles()
    : Promise<TravelPreferenceResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<TravelPreferenceResponse[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TravelPreferenceResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets the values for a specified category and attribute.
   * URL: GET REST/TravelPreference/Preferences/{categoryId}/Attributes/{attributeId}/Values
   * ID: GET-REST-TravelPreference-Preferences-categoryId-Attributes-attributeId-Values
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Preferences/{categoryId}/Attributes/{attributeId}/Values
   * UrlVar:  TravelPreference/Preferences/${categoryId}/Attributes/${attributeId}/Values
   * ResponseType: TravelPreferenceValueResponse[]
   * UriParams:
   * - categoryId:string:required
   * - attributeId:number:required
   * BodyParams:
   */
  public TravelPreference_GetTravelPreferenceValues(categoryId: string, attributeId: number)
    : Promise<TravelPreferenceValueResponse[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('categoryId', categoryId)
        .setAsStr('attributeId', attributeId)
        .toHttpParams()
    };
    return this.http
      .get<TravelPreferenceValueResponse[]>(`${this.apiUrlPrefix}/TravelPreference/Preferences/${categoryId}/Attributes/${attributeId}/Values`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new TravelPreferenceValueResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a collection of ranked categories for a requested user and travel preference profile.
   * URL: GET REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences
   * ID: GET-REST-TravelPreference-Profiles-travelPreferenceProfileId-Preferences
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences
   * ResponseType: PreferenceCategory[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * BodyParams:
   */
  public TravelPreference_GetUserCategories(travelPreferenceProfileId: string)
    : Promise<PreferenceCategory[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .toHttpParams()
    };
    return this.http
      .get<PreferenceCategory[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceCategory(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a collection of ranked categories for a requested user and travel preference profile.
   * URL: GET REST/TravelPreference/Profile/{travelPreferenceProfileId}/Categories
   * ID: GET-REST-TravelPreference-Profile-travelPreferenceProfileId-Categories
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profile/{travelPreferenceProfileId}/Categories
   * UrlVar:  TravelPreference/Profile/${travelPreferenceProfileId}/Categories
   * ResponseType: PreferenceCategory[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * BodyParams:
   */
  public TravelPreference_GetUserCategories_2(travelPreferenceProfileId: string)
    : Promise<PreferenceCategory[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .toHttpParams()
    };
    return this.http
      .get<PreferenceCategory[]>(`${this.apiUrlPrefix}/TravelPreference/Profile/${travelPreferenceProfileId}/Categories`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceCategory(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a user's travel preference profile with categories, attributes, and values.
   * URL: GET REST/TravelPreference/Profile/{travelPreferenceProfileId}/Categories/Attributes/Values
   * ID: GET-REST-TravelPreference-Profile-travelPreferenceProfileId-Categories-Attributes-Values
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profile/{travelPreferenceProfileId}/Categories/Attributes/Values
   * UrlVar:  TravelPreference/Profile/${travelPreferenceProfileId}/Categories/Attributes/Values
   * ResponseType: PreferenceProfile
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * BodyParams:
   */
  public TravelPreference_GetUserProfileByIdWithCategoriesWithAttributesWithValues(travelPreferenceProfileId: string)
    : Promise<PreferenceProfile>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .toHttpParams()
    };
    return this.http
      .get<PreferenceProfile>(`${this.apiUrlPrefix}/TravelPreference/Profile/${travelPreferenceProfileId}/Categories/Attributes/Values`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new PreferenceProfile(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a collection of a user's travel preference profiles with categories, attributes, and values.
   * URL: GET REST/TravelPreference/Profiles/Categories/Attributes/Values
   * ID: GET-REST-TravelPreference-Profiles-Categories-Attributes-Values
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profiles/Categories/Attributes/Values
   * UrlVar:  TravelPreference/Profiles/Categories/Attributes/Values
   * ResponseType: PreferenceProfile[]
   * UriParams:
   * BodyParams:
   */
  public TravelPreference_GetUserProfilesWithCategoriesWithAttributesWithValues()
    : Promise<PreferenceProfile[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<PreferenceProfile[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/Categories/Attributes/Values`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceProfile(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a collection of ranked values for a requested user, travel preference profile, category, and attribute.
   * URL: GET REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes/{attributeId}/Values
   * ID: GET-REST-TravelPreference-Profiles-travelPreferenceProfileId-Preferences-categoryId-Attributes-attributeId-Values
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes/{attributeId}/Values
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes/${attributeId}/Values
   * ResponseType: PreferenceValue[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * - categoryId:string:required
   * - attributeId:string:required
   * BodyParams:
   */
  public TravelPreference_GetValues(travelPreferenceProfileId: string, categoryId: string, attributeId: string)
    : Promise<PreferenceValue[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .set('categoryId', categoryId)
        .set('attributeId', attributeId)
        .toHttpParams()
    };
    return this.http
      .get<PreferenceValue[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes/${attributeId}/Values`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceValue(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a collection of ranked values for a requested user, travel preference profile, category, and attribute.
   * URL: GET REST/TravelPreference/Profile/{travelPreferenceProfileId}/Category/{categoryId}/Attribute/{attributeId}/Values
   * ID: GET-REST-TravelPreference-Profile-travelPreferenceProfileId-Category-categoryId-Attribute-attributeId-Values
   * HttpMethod: get
   * UrlFull: REST/TravelPreference/Profile/{travelPreferenceProfileId}/Category/{categoryId}/Attribute/{attributeId}/Values
   * UrlVar:  TravelPreference/Profile/${travelPreferenceProfileId}/Category/${categoryId}/Attribute/${attributeId}/Values
   * ResponseType: PreferenceValue[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * - categoryId:string:required
   * - attributeId:string:required
   * BodyParams:
   */
  public TravelPreference_GetValues_2(travelPreferenceProfileId: string, categoryId: string, attributeId: string)
    : Promise<PreferenceValue[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .set('categoryId', categoryId)
        .set('attributeId', attributeId)
        .toHttpParams()
    };
    return this.http
      .get<PreferenceValue[]>(`${this.apiUrlPrefix}/TravelPreference/Profile/${travelPreferenceProfileId}/Category/${categoryId}/Attribute/${attributeId}/Values`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceValue(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updates attributes in a user's specified travel preference profile and category.
   * URL: PUT REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes
   * ID: PUT-REST-TravelPreference-Profiles-travelPreferenceProfileId-Preferences-categoryId-Attributes
   * HttpMethod: put
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes
   * ResponseType: PreferenceAttribute[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * - categoryId:string:required
   * BodyParams:
   * - attributes:PreferenceAttribute[]:required
   */
  public TravelPreference_SaveAttributes(travelPreferenceProfileId: string, categoryId: string, attributes: PreferenceAttribute[])
    : Promise<PreferenceAttribute[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .set('categoryId', categoryId)
        .toHttpParams()
    };
    return this.http
      .put<PreferenceAttribute[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes`, attributes, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceAttribute(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updates categories and their attributes in a user's specified travel preference profile.
   * URL: PUT REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences
   * ID: PUT-REST-TravelPreference-Profiles-travelPreferenceProfileId-Preferences
   * HttpMethod: put
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences
   * ResponseType: PreferenceCategory[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * BodyParams:
   * - preferences:PreferenceCategory[]:required
   */
  public TravelPreference_SaveCategories(travelPreferenceProfileId: string, preferences: PreferenceCategory[])
    : Promise<PreferenceCategory[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .toHttpParams()
    };
    return this.http
      .put<PreferenceCategory[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences`, preferences, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceCategory(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Creates or updates a user's travel preference profile and nested categories, their attributes, and the attribute values.
   * URL: PUT REST/TravelPreference/Profile/Categories/Attributes/Values
   * ID: PUT-REST-TravelPreference-Profile-Categories-Attributes-Values
   * HttpMethod: put
   * UrlFull: REST/TravelPreference/Profile/Categories/Attributes/Values
   * UrlVar:  TravelPreference/Profile/Categories/Attributes/Values
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - profile:PreferenceProfile:required
   */
  public TravelPreference_SaveProfile(profile: PreferenceProfile)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/TravelPreference/Profile/Categories/Attributes/Values`, profile, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Creates or updates a user's travel preference profiles and nested categories, their attributes, and the attribute values.
   * URL: PUT REST/TravelPreference/Profiles/Categories/Attributes/Values
   * ID: PUT-REST-TravelPreference-Profiles-Categories-Attributes-Values
   * HttpMethod: put
   * UrlFull: REST/TravelPreference/Profiles/Categories/Attributes/Values
   * UrlVar:  TravelPreference/Profiles/Categories/Attributes/Values
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - profiles:PreferenceProfile[]:required
   */
  public TravelPreference_SaveProfiles(profiles: PreferenceProfile[])
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/TravelPreference/Profiles/Categories/Attributes/Values`, profiles, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updates values in a user's specified travel preference profile, category, and attribute.
   * URL: PUT REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes/{attributeId}/Values
   * ID: PUT-REST-TravelPreference-Profiles-travelPreferenceProfileId-Preferences-categoryId-Attributes-attributeId-Values
   * HttpMethod: put
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}/Preferences/{categoryId}/Attributes/{attributeId}/Values
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes/${attributeId}/Values
   * ResponseType: PreferenceValue[]
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * - categoryId:string:required
   * - attributeId:number:required
   * BodyParams:
   * - values:PreferenceValue[]:required
   */
  public TravelPreference_SaveValues(travelPreferenceProfileId: string, categoryId: string, attributeId: number, values: PreferenceValue[])
    : Promise<PreferenceValue[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .set('categoryId', categoryId)
        .setAsStr('attributeId', attributeId)
        .toHttpParams()
    };
    return this.http
      .put<PreferenceValue[]>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}/Preferences/${categoryId}/Attributes/${attributeId}/Values`, values, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new PreferenceValue(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Create a travel preference profile for a user, optionally specifying the template travel
   * preference profile to use.
   * URL: POST REST/TravelPreference/Profiles
   * ID: POST-REST-TravelPreference-Profiles
   * HttpMethod: post
   * UrlFull: REST/TravelPreference/Profiles
   * UrlVar:  TravelPreference/Profiles
   * ResponseType: TravelPreferenceResponse
   * UriParams:
   * BodyParams:
   * - request:TravelPreferenceProfileRequest:required
   */
  public TravelPreference_SetTravelPreferenceProfiles(request: TravelPreferenceProfileRequest)
    : Promise<TravelPreferenceResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .post<TravelPreferenceResponse>(`${this.apiUrlPrefix}/TravelPreference/Profiles`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new TravelPreferenceResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Update a specified travel preference profile for a user.
   * URL: PUT REST/TravelPreference/Profiles/{travelPreferenceProfileId}
   * ID: PUT-REST-TravelPreference-Profiles-travelPreferenceProfileId
   * HttpMethod: put
   * UrlFull: REST/TravelPreference/Profiles/{travelPreferenceProfileId}
   * UrlVar:  TravelPreference/Profiles/${travelPreferenceProfileId}
   * ResponseType: TravelPreferenceResponse
   * UriParams:
   * - travelPreferenceProfileId:string:required
   * BodyParams:
   * - request:TravelPreferenceProfileRequest:required
   */
  public TravelPreference_SetTravelPreferenceProfiles_2(travelPreferenceProfileId: string, request: TravelPreferenceProfileRequest)
    : Promise<TravelPreferenceResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('travelPreferenceProfileId', travelPreferenceProfileId)
        .toHttpParams()
    };
    return this.http
      .put<TravelPreferenceResponse>(`${this.apiUrlPrefix}/TravelPreference/Profiles/${travelPreferenceProfileId}`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new TravelPreferenceResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Creates a trip summary from the requested solution.
   * URL: GET REST/TripSummary?itineraryId={itineraryId}
   * ID: GET-REST-TripSummary_itineraryId
   * HttpMethod: get
   * UrlFull: REST/TripSummary?itineraryId={itineraryId}
   * UrlVar:  TripSummary
   * ResponseType: TripSummary
   * UriParams:
   * - itineraryId:string:optional
   * BodyParams:
   */
  public TripSummary_GET(itineraryId?: string)
    : Promise<TripSummary>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('itineraryId', itineraryId)
        .toHttpParams()
    };
    return this.http
      .get<TripSummary>(`${this.apiUrlPrefix}/TripSummary`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new TripSummary(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Accept a group invitation
   * URL: PUT REST/UserGroup/{userGroupId}/Invitation/{authKey}
   * ID: PUT-REST-UserGroup-userGroupId-Invitation-authKey
   * HttpMethod: put
   * UrlFull: REST/UserGroup/{userGroupId}/Invitation/{authKey}
   * UrlVar:  UserGroup/${userGroupId}/Invitation/${authKey}
   * ResponseType: void
   * UriParams:
   * - userGroupId:number:required
   * - authKey:string:required
   * BodyParams:
   */
  public UserGroup_AcceptGroupInvitation(userGroupId: number, authKey: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('userGroupId', userGroupId)
        .set('authKey', authKey)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/UserGroup/${userGroupId}/Invitation/${authKey}`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Creates a group if you are a group admin
   * URL: POST REST/UserGroup
   * ID: POST-REST-UserGroup
   * HttpMethod: post
   * UrlFull: REST/UserGroup
   * UrlVar:  UserGroup
   * ResponseType: UserGroup
   * UriParams:
   * BodyParams:
   * - request:UserGroupRequest:required
   */
  public UserGroup_AddGroup(request: UserGroupRequest)
    : Promise<UserGroup>
  {
    let options = { headers: this.headers };
    return this.http
      .post<UserGroup>(`${this.apiUrlPrefix}/UserGroup`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UserGroup(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Add a member to a group
   * URL: POST REST/UserGroup/{groupId}
   * ID: POST-REST-UserGroup-groupId
   * HttpMethod: post
   * UrlFull: REST/UserGroup/{groupId}
   * UrlVar:  UserGroup/${groupId}
   * ResponseType: void
   * UriParams:
   * - groupId:number:required
   * BodyParams:
   * - email:string:required
   */
  public UserGroup_AddGroupMember(groupId: number, email: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/UserGroup/${groupId}`, JSON.stringify(email), options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Decline an invite to a group
   * URL: DELETE REST/UserGroup/{userGroupId}/Invitation/{authKey}
   * ID: DELETE-REST-UserGroup-userGroupId-Invitation-authKey
   * HttpMethod: delete
   * UrlFull: REST/UserGroup/{userGroupId}/Invitation/{authKey}
   * UrlVar:  UserGroup/${userGroupId}/Invitation/${authKey}
   * ResponseType: void
   * UriParams:
   * - userGroupId:number:required
   * - authKey:string:required
   * BodyParams:
   */
  public UserGroup_DeclineGroupInvitation(userGroupId: number, authKey: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('userGroupId', userGroupId)
        .set('authKey', authKey)
        .toHttpParams()
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/UserGroup/${userGroupId}/Invitation/${authKey}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets the group of the current user
   * URL: GET REST/UserGroup
   * ID: GET-REST-UserGroup
   * HttpMethod: get
   * UrlFull: REST/UserGroup
   * UrlVar:  UserGroup
   * ResponseType: UserGroup
   * UriParams:
   * BodyParams:
   */
  public UserGroup_GetGroup()
    : Promise<UserGroup>
  {
    let options = { headers: this.headers };
    return this.http
      .get<UserGroup>(`${this.apiUrlPrefix}/UserGroup`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UserGroup(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets the list of groups invitations
   * URL: GET REST/UserGroup/Invitations
   * ID: GET-REST-UserGroup-Invitations
   * HttpMethod: get
   * UrlFull: REST/UserGroup/Invitations
   * UrlVar:  UserGroup/Invitations
   * ResponseType: GroupInivtation[]
   * UriParams:
   * BodyParams:
   */
  public UserGroup_GetGroupInvitations()
    : Promise<GroupInivtation[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<GroupInivtation[]>(`${this.apiUrlPrefix}/UserGroup/Invitations`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new GroupInivtation(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get the members of a group
   * URL: GET REST/UserGroup/{groupId}
   * ID: GET-REST-UserGroup-groupId
   * HttpMethod: get
   * UrlFull: REST/UserGroup/{groupId}
   * UrlVar:  UserGroup/${groupId}
   * ResponseType: UserGroupMember[]
   * UriParams:
   * - groupId:number:required
   * BodyParams:
   */
  public UserGroup_GetGroupMembers(groupId: number)
    : Promise<UserGroupMember[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .toHttpParams()
    };
    return this.http
      .get<UserGroupMember[]>(`${this.apiUrlPrefix}/UserGroup/${groupId}`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new UserGroupMember(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Deleted a member of a group
   * URL: DELETE REST/UserGroup/{groupId}/{groupMemberId}
   * ID: DELETE-REST-UserGroup-groupId-groupMemberId
   * HttpMethod: delete
   * UrlFull: REST/UserGroup/{groupId}/{groupMemberId}
   * UrlVar:  UserGroup/${groupId}/${groupMemberId}
   * ResponseType: void
   * UriParams:
   * - groupId:number:required
   * - groupMemberId:number:required
   * BodyParams:
   */
  public UserGroup_RemoveGroupMember(groupId: number, groupMemberId: number)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .setAsStr('groupMemberId', groupMemberId)
        .toHttpParams()
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/UserGroup/${groupId}/${groupMemberId}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updates the group name and description
   * URL: PUT REST/UserGroup/{groupId}
   * ID: PUT-REST-UserGroup-groupId
   * HttpMethod: put
   * UrlFull: REST/UserGroup/{groupId}
   * UrlVar:  UserGroup/${groupId}
   * ResponseType: UserGroup
   * UriParams:
   * - groupId:number:required
   * BodyParams:
   * - request:UserGroupRequest:required
   */
  public UserGroup_RenameGroup(groupId: number, request: UserGroupRequest)
    : Promise<UserGroup>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('groupId', groupId)
        .toHttpParams()
    };
    return this.http
      .put<UserGroup>(`${this.apiUrlPrefix}/UserGroup/${groupId}`, request, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UserGroup(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Activates the e-mail address for the user that revieved the activation key
   * URL: POST REST/UserProfile/Activate?activationKey={activationKey}
   * ID: POST-REST-UserProfile-Activate_activationKey
   * HttpMethod: post
   * UrlFull: REST/UserProfile/Activate?activationKey={activationKey}
   * UrlVar:  UserProfile/Activate
   * ResponseType: SessionToken
   * UriParams:
   * - activationKey:string:required
   * BodyParams:
   */
  public UserProfile_ActivateUser(activationKey: string)
    : Promise<SessionToken>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('activationKey', activationKey)
        .toHttpParams()
    };
    return this.http
      .post<SessionToken>(`${this.apiUrlPrefix}/UserProfile/Activate`, null, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new SessionToken(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/UserProfile/Avatar
   * ID: POST-REST-UserProfile-Avatar
   * HttpMethod: post
   * UrlFull: REST/UserProfile/Avatar
   * UrlVar:  UserProfile/Avatar
   * ResponseType: UserImageResponse
   * UriParams:
   * BodyParams:
   * - userImageRequest:UserImageRequest:required
   */
  public UserProfile_AddUserAvatar(userImageRequest: UserImageRequest)
    : Promise<UserImageResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .post<UserImageResponse>(`${this.apiUrlPrefix}/UserProfile/Avatar`, userImageRequest, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UserImageResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updates the user's profile with a new password.
   * URL: POST REST/UserProfile/Password
   * ID: POST-REST-UserProfile-Password
   * HttpMethod: post
   * UrlFull: REST/UserProfile/Password
   * UrlVar:  UserProfile/Password
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - input:ChangePasswordRequest:required
   */
  public UserProfile_ChangePassword(input: ChangePasswordRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/UserProfile/Password`, input, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/UserProfile/AnonymousToRegularUser
   * ID: PUT-REST-UserProfile-AnonymousToRegularUser
   * HttpMethod: put
   * UrlFull: REST/UserProfile/AnonymousToRegularUser
   * UrlVar:  UserProfile/AnonymousToRegularUser
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - req:AnonymousToRegularRequest:required
   */
  public UserProfile_ConvertAnonymousToRegularUser(req: AnonymousToRegularRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/UserProfile/AnonymousToRegularUser`, req, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: DELETE REST/UserProfile/Avatar
   * ID: DELETE-REST-UserProfile-Avatar
   * HttpMethod: delete
   * UrlFull: REST/UserProfile/Avatar
   * UrlVar:  UserProfile/Avatar
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - userImageRequest:UserImageRequest:required
   */
  public UserProfile_DeleteUserAvatar(userImageRequest: UserImageRequest)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      body: userImageRequest
    };
    return this.http
      .delete<void>(`${this.apiUrlPrefix}/UserProfile/Avatar`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Get the user's profile.
   * URL: GET REST/UserProfile
   * ID: GET-REST-UserProfile
   * HttpMethod: get
   * UrlFull: REST/UserProfile
   * UrlVar:  UserProfile
   * ResponseType: UserProfileResponse
   * UriParams:
   * BodyParams:
   */
  public UserProfile_GET()
    : Promise<UserProfileResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .get<UserProfileResponse>(`${this.apiUrlPrefix}/UserProfile`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UserProfileResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets a CAPTCHA image in base64
   * URL: GET REST/UserProfile/Captcha
   * ID: GET-REST-UserProfile-Captcha
   * HttpMethod: get
   * UrlFull: REST/UserProfile/Captcha
   * UrlVar:  UserProfile/Captcha
   * ResponseType: GraphicsResponse
   * UriParams:
   * BodyParams:
   */
  public UserProfile_GetCaptcha()
    : Promise<GraphicsResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .get<GraphicsResponse>(`${this.apiUrlPrefix}/UserProfile/Captcha`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new GraphicsResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Returns the email address associated with an invitation token.
   * URL: GET REST/UserProfile/Invitation/{invitationToken}
   * ID: GET-REST-UserProfile-Invitation-invitationToken
   * HttpMethod: get
   * UrlFull: REST/UserProfile/Invitation/{invitationToken}
   * UrlVar:  UserProfile/Invitation/${invitationToken}
   * ResponseType: string
   * UriParams:
   * - invitationToken:string:optional
   * BodyParams:
   */
  public UserProfile_GetInvitationByd(invitationToken?: string)
    : Promise<string>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('invitationToken', invitationToken)
        .toHttpParams()
    };
    return this.http
      .get<string>(`${this.apiUrlPrefix}/UserProfile/Invitation/${invitationToken}`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/UserProfile/GetUserDetail?userId={userId}
   * ID: GET-REST-UserProfile-GetUserDetail_userId
   * HttpMethod: get
   * UrlFull: REST/UserProfile/GetUserDetail?userId={userId}
   * UrlVar:  UserProfile/GetUserDetail
   * ResponseType: UserProfileBaseResponse
   * UriParams:
   * - userId:string:required
   * BodyParams:
   */
  public UserProfile_GetUserDetail(userId: string)
    : Promise<UserProfileBaseResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('userId', userId)
        .toHttpParams()
    };
    return this.http
      .get<UserProfileBaseResponse>(`${this.apiUrlPrefix}/UserProfile/GetUserDetail`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UserProfileBaseResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Gets the collection of email addresses associated with the current user.
   * URL: GET REST/UserProfile/Accounts
   * ID: GET-REST-UserProfile-Accounts
   * HttpMethod: get
   * UrlFull: REST/UserProfile/Accounts
   * UrlVar:  UserProfile/Accounts
   * ResponseType: UserLoginResponse[]
   * UriParams:
   * BodyParams:
   */
  public UserProfile_GetUserLogins()
    : Promise<UserLoginResponse[]>
  {
    let options = { headers: this.headers };
    return this.http
      .get<UserLoginResponse[]>(`${this.apiUrlPrefix}/UserProfile/Accounts`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new UserLoginResponse(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * Resets the users password and sends email for confirmation
   * Only resets password if captchaText exist
   * URL: PUT REST/UserProfile/PasswordReset?email={email}&captchaId={captchaId}&captchaText={captchaText}
   * ID: PUT-REST-UserProfile-PasswordReset_email_captchaId_captchaText
   * HttpMethod: put
   * UrlFull: REST/UserProfile/PasswordReset?email={email}&captchaId={captchaId}&captchaText={captchaText}
   * UrlVar:  UserProfile/PasswordReset
   * ResponseType: void
   * UriParams:
   * - email:string:required
   * - captchaId:string:required
   * - captchaText:string:required
   * BodyParams:
   */
  public UserProfile_PasswordReset(email: string, captchaId: string, captchaText: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('email', email)
        .set('captchaId', captchaId)
        .set('captchaText', captchaText)
        .toHttpParams()
    };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/UserProfile/PasswordReset`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Updates and persists the user's profile.
   * URL: PUT REST/UserProfile
   * ID: PUT-REST-UserProfile
   * HttpMethod: put
   * UrlFull: REST/UserProfile
   * UrlVar:  UserProfile
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - req:UpdateUserProfileRequest:required
   */
  public UserProfile_PUT(req: UpdateUserProfileRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/UserProfile`, req, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Creates a user profile based on the supplied profile data, including a token that was sent in the
   * invitation email, and activates the added user.
   * URL: POST REST/UserProfile/Register
   * ID: POST-REST-UserProfile-Register
   * HttpMethod: post
   * UrlFull: REST/UserProfile/Register
   * UrlVar:  UserProfile/Register
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - input:AddUserProfileRequest:required
   */
  public UserProfile_Register(input: AddUserProfileRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/UserProfile/Register`, input, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: POST REST/UserProfile/ResendWelcomeEmail?email={email}
   * ID: POST-REST-UserProfile-ResendWelcomeEmail_email
   * HttpMethod: post
   * UrlFull: REST/UserProfile/ResendWelcomeEmail?email={email}
   * UrlVar:  UserProfile/ResendWelcomeEmail
   * ResponseType: void
   * UriParams:
   * - email:string:required
   * BodyParams:
   */
  public UserProfile_ResendWelcomeEmail(email: string)
    : Promise<void>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('email', email)
        .toHttpParams()
    };
    return this.http
      .post<void>(`${this.apiUrlPrefix}/UserProfile/ResendWelcomeEmail`, null, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * Search for a user profile by name or email
   * URL: GET REST/UserProfile/Search?searchParam={searchParam}&excludeCompanions={excludeCompanions}&skip={skip}&count={count}
   * ID: GET-REST-UserProfile-Search_searchParam_excludeCompanions_skip_count
   * HttpMethod: get
   * UrlFull: REST/UserProfile/Search?searchParam={searchParam}&excludeCompanions={excludeCompanions}&skip={skip}&count={count}
   * UrlVar:  UserProfile/Search
   * ResponseType: CompanionSearchResponse
   * UriParams:
   * - searchParam:string:required
   * - excludeCompanions:boolean:optional
   * - skip:number:optional
   * - count:number:optional
   * BodyParams:
   */
  public UserProfile_Search(searchParam: string, excludeCompanions?: boolean, skip?: number, count?: number)
    : Promise<CompanionSearchResponse>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('searchParam', searchParam)
        .setAsStr('excludeCompanions', excludeCompanions)
        .setAsStr('skip', skip)
        .setAsStr('count', count)
        .toHttpParams()
    };
    return this.http
      .get<CompanionSearchResponse>(`${this.apiUrlPrefix}/UserProfile/Search`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new CompanionSearchResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * Sets a default travel preference associated with one of the user's collection of login emails.
   * URL: PUT REST/UserProfile/Accounts/TravelPreference
   * ID: PUT-REST-UserProfile-Accounts-TravelPreference
   * HttpMethod: put
   * UrlFull: REST/UserProfile/Accounts/TravelPreference
   * UrlVar:  UserProfile/Accounts/TravelPreference
   * ResponseType: UserLoginResponse
   * UriParams:
   * BodyParams:
   * - req:SetTravelPreferenceRequest:required
   */
  public UserProfile_SetTravelPreference(req: SetTravelPreferenceRequest)
    : Promise<UserLoginResponse>
  {
    let options = { headers: this.headers };
    return this.http
      .put<UserLoginResponse>(`${this.apiUrlPrefix}/UserProfile/Accounts/TravelPreference`, req, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new UserLoginResponse(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: PUT REST/UserProfile/UserType
   * ID: PUT-REST-UserProfile-UserType
   * HttpMethod: put
   * UrlFull: REST/UserProfile/UserType
   * UrlVar:  UserProfile/UserType
   * ResponseType: void
   * UriParams:
   * BodyParams:
   * - input:UpdateUserTypeRequest:required
   */
  public UserProfile_UpdateUserType(input: UpdateUserTypeRequest)
    : Promise<void>
  {
    let options = { headers: this.headers };
    return this.http
      .put<void>(`${this.apiUrlPrefix}/UserProfile/UserType`, input, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * 
   * URL: GET REST/Version
   * ID: GET-REST-Version
   * HttpMethod: get
   * UrlFull: REST/Version
   * UrlVar:  Version
   * ResponseType: string
   * UriParams:
   * BodyParams:
   */
  public Version_GET()
    : Promise<string>
  {
    let options = { headers: this.headers };
    return this.http
      .get<string>(`${this.apiUrlPrefix}/Version`, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  /**
   * GetEmailAnswer
   * URL: GET REST/Wernicke/GetEmailAnswerByFileName?batchName={batchName}&fileName={fileName}
   * ID: GET-REST-Wernicke-GetEmailAnswerByFileName_batchName_fileName
   * HttpMethod: get
   * UrlFull: REST/Wernicke/GetEmailAnswerByFileName?batchName={batchName}&fileName={fileName}
   * UrlVar:  Wernicke/GetEmailAnswerByFileName
   * ResponseType: WernickeEmail
   * UriParams:
   * - batchName:string:required
   * - fileName:string:required
   * BodyParams:
   */
  public WernickeTest_GetEmailAnswer(batchName: string, fileName: string)
    : Promise<WernickeEmail>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('batchName', batchName)
        .set('fileName', fileName)
        .toHttpParams()
    };
    return this.http
      .get<WernickeEmail>(`${this.apiUrlPrefix}/Wernicke/GetEmailAnswerByFileName`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new WernickeEmail(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * GetEmailAnswer
   * URL: GET REST/Wernicke/GetEmailAnswerByIncident?incidentId={incidentId}
   * ID: GET-REST-Wernicke-GetEmailAnswerByIncident_incidentId
   * HttpMethod: get
   * UrlFull: REST/Wernicke/GetEmailAnswerByIncident?incidentId={incidentId}
   * UrlVar:  Wernicke/GetEmailAnswerByIncident
   * ResponseType: WernickeEmail
   * UriParams:
   * - incidentId:string:required
   * BodyParams:
   */
  public WernickeTest_GetEmailAnswer_2(incidentId: string)
    : Promise<WernickeEmail>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .set('incidentId', incidentId)
        .toHttpParams()
    };
    return this.http
      .get<WernickeEmail>(`${this.apiUrlPrefix}/Wernicke/GetEmailAnswerByIncident`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new WernickeEmail(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * GetEmailAnswer
   * URL: GET REST/Wernicke/GetEmails?batch={batch}
   * ID: GET-REST-Wernicke-GetEmails_batch
   * HttpMethod: get
   * UrlFull: REST/Wernicke/GetEmails?batch={batch}
   * UrlVar:  Wernicke/GetEmails
   * ResponseType: WernickeEmail[]
   * UriParams:
   * - batch:TestBatch:required
   * BodyParams:
   */
  public WernickeTest_GetEmails(batch: TestBatch)
    : Promise<WernickeEmail[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('batch', batch)
        .toHttpParams()
    };
    return this.http
      .get<WernickeEmail[]>(`${this.apiUrlPrefix}/Wernicke/GetEmails`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new WernickeEmail(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * GetEmailTestResult
   * URL: GET REST/Wernicke/GetEmailTestResult?testId={testId}&batchId={batchId}&incidentId={incidentId}
   * ID: GET-REST-Wernicke-GetEmailTestResult_testId_batchId_incidentId
   * HttpMethod: get
   * UrlFull: REST/Wernicke/GetEmailTestResult?testId={testId}&batchId={batchId}&incidentId={incidentId}
   * UrlVar:  Wernicke/GetEmailTestResult
   * ResponseType: WernickeEmailTestResult
   * UriParams:
   * - testId:number:required
   * - batchId:number:required
   * - incidentId:string:required
   * BodyParams:
   */
  public WernickeTest_GetEmailTestResult(testId: number, batchId: number, incidentId: string)
    : Promise<WernickeEmailTestResult>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('testId', testId)
        .setAsStr('batchId', batchId)
        .set('incidentId', incidentId)
        .toHttpParams()
    };
    return this.http
      .get<WernickeEmailTestResult>(`${this.apiUrlPrefix}/Wernicke/GetEmailTestResult`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => response ? new WernickeEmailTestResult(response) : null)
      .catch(error => this.handleError(error));
  }
  
  /**
   * GetReportData
   * URL: GET REST/Wernicke/GetReportData?batchId={batchId}
   * ID: GET-REST-Wernicke-GetReportData_batchId
   * HttpMethod: get
   * UrlFull: REST/Wernicke/GetReportData?batchId={batchId}
   * UrlVar:  Wernicke/GetReportData
   * ResponseType: WernickeEmailChartData[]
   * UriParams:
   * - batchId:number:required
   * BodyParams:
   */
  public WernickeTest_GetReportData(batchId: number)
    : Promise<WernickeEmailChartData[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('batchId', batchId)
        .toHttpParams()
    };
    return this.http
      .get<WernickeEmailChartData[]>(`${this.apiUrlPrefix}/Wernicke/GetReportData`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new WernickeEmailChartData(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * GetReportResultData
   * URL: GET REST/Wernicke/GetReportResultData?testId={testId}&batchId={batchId}&offset={offset}&amount={amount}
   * ID: GET-REST-Wernicke-GetReportResultData_testId_batchId_offset_amount
   * HttpMethod: get
   * UrlFull: REST/Wernicke/GetReportResultData?testId={testId}&batchId={batchId}&offset={offset}&amount={amount}
   * UrlVar:  Wernicke/GetReportResultData
   * ResponseType: WernickeTestResult[]
   * UriParams:
   * - testId:number:required
   * - batchId:number:required
   * - offset:number:required
   * - amount:number:required
   * BodyParams:
   */
  public WernickeTest_GetReportResultData(testId: number, batchId: number, offset: number, amount: number)
    : Promise<WernickeTestResult[]>
  {
    let options = {
      headers: this.headers,
      params: new HttpParamsBuilder()
        .setAsStr('testId', testId)
        .setAsStr('batchId', batchId)
        .setAsStr('offset', offset)
        .setAsStr('amount', amount)
        .toHttpParams()
    };
    return this.http
      .get<WernickeTestResult[]>(`${this.apiUrlPrefix}/Wernicke/GetReportResultData`, options)
      .pipe(take(1))
      .toPromise()
      .then(response => _.map(response, x => x ? new WernickeTestResult(x) : null))
      .catch(error => this.handleError(error));
  }
  
  /**
   * UpdateEmailAnswer
   * URL: POST REST/Wernicke/UpdateEmailAnswer
   * ID: POST-REST-Wernicke-UpdateEmailAnswer
   * HttpMethod: post
   * UrlFull: REST/Wernicke/UpdateEmailAnswer
   * UrlVar:  Wernicke/UpdateEmailAnswer
   * ResponseType: boolean
   * UriParams:
   * BodyParams:
   * - req:WernickeEmail:required
   */
  public WernickeTest_UpdateEmailAnswer(req: WernickeEmail)
    : Promise<boolean>
  {
    let options = { headers: this.headers };
    return this.http
      .post<boolean>(`${this.apiUrlPrefix}/Wernicke/UpdateEmailAnswer`, req, options)
      .pipe(take(1))
      .toPromise()
      .catch(error => this.handleError(error));
  }
  
  public readonly onError: Subject<HttpResponse> = new Subject<HttpResponse>();
  
  private handleError(error: HttpResponse): Promise<any> {
    this.onError.next(error);
    //console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
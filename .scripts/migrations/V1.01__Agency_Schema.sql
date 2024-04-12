CREATE TYPE "Role" AS ENUM (
  'AGENCY_OWNER',
  'AGENCY_ADMIN',
  'SUBACCOUNT_USER',
  'SUBACCOUNT_GUEST'
);

CREATE TYPE "Icon" AS ENUM (
  'settings',
  'chart',
  'calendar',
  'check',
  'chip',
  'compass',
  'database',
  'flag',
  'home',
  'info',
  'link',
  'lock',
  'messages',
  'notification',
  'payment',
  'power',
  'receipt',
  'shield',
  'star',
  'tune',
  'videorecorder',
  'wallet',
  'warning',
  'headphone',
  'send',
  'pipelines',
  'person',
  'category',
  'contact',
  'clipboardIcon'
);

CREATE TYPE "TriggerTypes" AS ENUM (
  'CONTACT_FORM'
);

CREATE TYPE "ActionType" AS ENUM (
  'CREATE_CONTACT'
);

CREATE TYPE "InvitationStatus" AS ENUM (
  'ACCEPTED',
  'REVOKED',
  'PENDING'
);

CREATE TYPE "Plan" AS ENUM (
  'price_1OYxkqFj9oKEERu1NbKUxXxN',
  'price_1OYxkqFj9oKEERu1KfJGWxgN'
);


CREATE TABLE "User" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "avatarUrl" String NOT NULL,
  "email" String UNIQUE NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "role" Role NOT NULL DEFAULT 'SUBACCOUNT_USER',
  "agencyId" String,
  "Agency" Agency,
  "Permissions" Permissions NOT NULL,
  "Ticket" Ticket NOT NULL,
  "Notification" Notification NOT NULL
);

CREATE TABLE "Permissions" (
  "id" String PRIMARY KEY,
  "email" String NOT NULL,
  "User" User NOT NULL,
  "subAccountId" String NOT NULL,
  "SubAccount" SubAccount NOT NULL,
  "access" Boolean NOT NULL
);

CREATE TABLE "Agency" (
  "id" String PRIMARY KEY,
  "connectAccountId" String DEFAULT '',
  "customerId" String NOT NULL DEFAULT '',
  "name" String NOT NULL,
  "agencyLogo" String NOT NULL,
  "companyEmail" String NOT NULL,
  "companyPhone" String NOT NULL,
  "whiteLabel" Boolean NOT NULL DEFAULT true,
  "address" String NOT NULL,
  "city" String NOT NULL,
  "zipCode" String NOT NULL,
  "state" String NOT NULL,
  "country" String NOT NULL,
  "goal" Int NOT NULL DEFAULT 5,
  "users" User NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "SubAccount" SubAccount NOT NULL,
  "SidebarOption" AgencySidebarOption NOT NULL,
  "Invitation" Invitation NOT NULL,
  "Notification" Notification NOT NULL,
  "Subscription" Subscription,
  "AddOns" AddOns NOT NULL
);

CREATE TABLE "SubAccount" (
  "id" String PRIMARY KEY,
  "connectAccountId" String DEFAULT '',
  "name" String NOT NULL,
  "subAccountLogo" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "companyEmail" String NOT NULL,
  "companyPhone" String NOT NULL,
  "goal" Int NOT NULL DEFAULT 5,
  "address" String NOT NULL,
  "city" String NOT NULL,
  "zipCode" String NOT NULL,
  "state" String NOT NULL,
  "country" String NOT NULL,
  "agencyId" String NOT NULL,
  "Agency" Agency NOT NULL,
  "SidebarOption" SubAccountSidebarOption NOT NULL,
  "Permissions" Permissions NOT NULL,
  "Funnels" Funnel NOT NULL,
  "Media" Media NOT NULL,
  "Contact" Contact NOT NULL,
  "Trigger" Trigger NOT NULL,
  "Automation" Automation NOT NULL,
  "Pipeline" Pipeline NOT NULL,
  "Tags" Tag NOT NULL,
  "Notification" Notification NOT NULL
);

CREATE TABLE "Tag" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "color" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "subAccountId" String NOT NULL,
  "SubAccount" SubAccount NOT NULL,
  "Ticket" Ticket NOT NULL
);

CREATE TABLE "Pipeline" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "Lane" Lane NOT NULL,
  "SubAccount" SubAccount NOT NULL,
  "subAccountId" String NOT NULL
);

CREATE TABLE "Lane" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "Pipeline" Pipeline NOT NULL,
  "pipelineId" String NOT NULL,
  "Tickets" Ticket NOT NULL,
  "order" Int NOT NULL DEFAULT 0
);

CREATE TABLE "Ticket" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "laneId" String NOT NULL,
  "order" Int NOT NULL DEFAULT 0,
  "Lane" Lane NOT NULL,
  "value" Decimal,
  "description" String,
  "Tags" Tag NOT NULL,
  "customerId" String,
  "Customer" Contact,
  "assignedUserId" String,
  "Assigned" User
);

CREATE TABLE "Trigger" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "type" TriggerTypes NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "subAccountId" String NOT NULL,
  "Subaccount" SubAccount NOT NULL,
  "Automations" Automation NOT NULL
);

CREATE TABLE "Automation" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "triggerId" String,
  "published" Boolean NOT NULL DEFAULT false,
  "Trigger" Trigger,
  "subAccountId" String NOT NULL,
  "Subaccount" SubAccount NOT NULL,
  "Action" Action NOT NULL,
  "AutomationInstance" AutomationInstance NOT NULL
);

CREATE TABLE "AutomationInstance" (
  "id" String PRIMARY KEY,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "automationId" String NOT NULL,
  "Automation" Automation NOT NULL,
  "active" Boolean NOT NULL DEFAULT false
);

CREATE TABLE "Action" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "type" ActionType NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "automationId" String NOT NULL,
  "order" Int NOT NULL,
  "Automation" Automation NOT NULL,
  "laneId" String NOT NULL DEFAULT '0'
);

CREATE TABLE "Contact" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "email" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "subAccountId" String NOT NULL,
  "Subaccount" SubAccount NOT NULL,
  "Ticket" Ticket NOT NULL
);

CREATE TABLE "Media" (
  "id" String PRIMARY KEY,
  "type" String,
  "name" String NOT NULL,
  "link" String UNIQUE NOT NULL,
  "subAccountId" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "Subaccount" SubAccount NOT NULL
);

CREATE TABLE "Funnel" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "description" String,
  "published" Boolean NOT NULL DEFAULT false,
  "subDomainName" String UNIQUE,
  "favicon" String,
  "subAccountId" String NOT NULL,
  "SubAccount" SubAccount NOT NULL,
  "FunnelPages" FunnelPage NOT NULL,
  "liveProducts" String DEFAULT '[]',
  "ClassName" ClassName NOT NULL
);

CREATE TABLE "ClassName" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "color" String NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "funnelId" String NOT NULL,
  "customData" String,
  "Funnel" Funnel NOT NULL
);

CREATE TABLE "FunnelPage" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL,
  "pathName" String NOT NULL DEFAULT '',
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "visits" Int NOT NULL DEFAULT 0,
  "content" String,
  "order" Int NOT NULL,
  "previewImage" String,
  "funnelId" String NOT NULL,
  "Funnel" Funnel NOT NULL
);

CREATE TABLE "AgencySidebarOption" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL DEFAULT 'Menu',
  "link" String NOT NULL DEFAULT '#',
  "icon" Icon NOT NULL DEFAULT 'info',
  "agencyId" String NOT NULL,
  "Agency" Agency,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL
);

CREATE TABLE "SubAccountSidebarOption" (
  "id" String PRIMARY KEY,
  "name" String NOT NULL DEFAULT 'Menu',
  "link" String NOT NULL DEFAULT '#',
  "icon" Icon NOT NULL DEFAULT 'info',
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "SubAccount" SubAccount,
  "subAccountId" String
);

CREATE TABLE "Invitation" (
  "id" String PRIMARY KEY,
  "email" String UNIQUE NOT NULL,
  "agencyId" String NOT NULL,
  "Agency" Agency NOT NULL,
  "status" InvitationStatus NOT NULL DEFAULT 'PENDING',
  "role" Role NOT NULL DEFAULT 'SUBACCOUNT_USER'
);

CREATE TABLE "Notification" (
  "id" String PRIMARY KEY,
  "notification" String NOT NULL,
  "agencyId" String NOT NULL,
  "subAccountId" String,
  "userId" String NOT NULL,
  "User" User NOT NULL,
  "Agency" Agency NOT NULL,
  "SubAccount" SubAccount,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL
);

CREATE TABLE "Subscription" (
  "id" String PRIMARY KEY,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "plan" Plan,
  "price" String,
  "active" Boolean NOT NULL DEFAULT false,
  "priceId" String NOT NULL,
  "customerId" String NOT NULL,
  "currentPeriodEndDate" DateTime NOT NULL,
  "subscritiptionId" String UNIQUE NOT NULL,
  "agencyId" String UNIQUE,
  "Agency" Agency
);

CREATE TABLE "AddOns" (
  "id" String PRIMARY KEY,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL,
  "name" String NOT NULL,
  "active" Boolean NOT NULL DEFAULT false,
  "priceId" String UNIQUE NOT NULL,
  "agencyId" String,
  "Agency" Agency
);

CREATE TABLE "TagToTicket" (
  "ticketId" String,
  "tagsId" String
);

ALTER TABLE "TagToTicket" ADD FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id");

ALTER TABLE "TagToTicket" ADD FOREIGN KEY ("tagsId") REFERENCES "Tag" ("id");

ALTER TABLE "digitalassets" ADD FOREIGN KEY ("milestoneId") REFERENCES "milestones" ("milestoneId") ON DELETE NO ACTION;

ALTER TABLE "milestones" ADD FOREIGN KEY ("projectId") REFERENCES "projects" ("projectId") ON DELETE NO ACTION;

ALTER TABLE "User" ADD FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE CASCADE;

ALTER TABLE "Permissions" ADD FOREIGN KEY ("email") REFERENCES "User" ("email") ON DELETE CASCADE;

ALTER TABLE "Permissions" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "SubAccount" ADD FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE CASCADE;

ALTER TABLE "Tag" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "Pipeline" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "Lane" ADD FOREIGN KEY ("pipelineId") REFERENCES "Pipeline" ("id") ON DELETE CASCADE;

ALTER TABLE "Ticket" ADD FOREIGN KEY ("laneId") REFERENCES "Lane" ("id") ON DELETE CASCADE;

ALTER TABLE "Ticket" ADD FOREIGN KEY ("customerId") REFERENCES "Contact" ("id") ON DELETE SET NULL;

ALTER TABLE "Ticket" ADD FOREIGN KEY ("assignedUserId") REFERENCES "User" ("id") ON DELETE SET NULL;

ALTER TABLE "Trigger" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "Automation" ADD FOREIGN KEY ("triggerId") REFERENCES "Trigger" ("id") ON DELETE CASCADE;

ALTER TABLE "Automation" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "AutomationInstance" ADD FOREIGN KEY ("automationId") REFERENCES "Automation" ("id") ON DELETE CASCADE;

ALTER TABLE "Action" ADD FOREIGN KEY ("automationId") REFERENCES "Automation" ("id") ON DELETE CASCADE;

ALTER TABLE "Contact" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "Media" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "Funnel" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "ClassName" ADD FOREIGN KEY ("funnelId") REFERENCES "Funnel" ("id") ON DELETE CASCADE;

ALTER TABLE "FunnelPage" ADD FOREIGN KEY ("funnelId") REFERENCES "Funnel" ("id") ON DELETE CASCADE;

ALTER TABLE "AgencySidebarOption" ADD FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE CASCADE;

ALTER TABLE "SubAccountSidebarOption" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "Invitation" ADD FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE CASCADE;

ALTER TABLE "Notification" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE;

ALTER TABLE "Notification" ADD FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE CASCADE;

ALTER TABLE "Notification" ADD FOREIGN KEY ("subAccountId") REFERENCES "SubAccount" ("id") ON DELETE CASCADE;

ALTER TABLE "Agency" ADD FOREIGN KEY ("id") REFERENCES "Subscription" ("agencyId");

ALTER TABLE "AddOns" ADD FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id");

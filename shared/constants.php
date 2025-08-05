<?php

use Shared\Traits\EnumerableTrait;

enum SystemModule: string
{
    use EnumerableTrait;

    case users = 'Users';
}

//'feedback', 'question', 'suggestion', 'praise', 'complaint'
enum CommentType:int
{
    use EnumerableTrait;

    case FEEDBACK = 1;
    case QUESTION = 2;
    case SUGGESTION = 3;
    case PRAISE = 4;
    case COMPLAINT = 5;
}



define('SYSTEM_MODULES', SystemModule::names());

define('SYSTEM_STATES', SystemState::names());

define('IDENTITY_PROVIDERS', IdentityProvider::names());

define('ACTIONS', Action::names());

define('MYSQL_DATE_FORMAT', 'Y-m-d');
define('MYSQL_DATETIME_FORMAT', 'Y-m-d H:i:s');
define('MYSQL_TIME_FORMAT', 'H:i:s');

define('MAXIMUM_FILE_SIZE', 5);

define('IMAGE_FILE_FORMATS', ['jpg', 'png', 'jpeg']);

define('DOCUMENT_FILE_FORMATS', ['pdf', 'xlsx']);

define('STORAGE_DEFAULT_FOLDER', 'files');

define('FILE_FORMATS', [
    'image' => IMAGE_FILE_FORMATS,
    'document' => DOCUMENT_FILE_FORMATS
]);

define('PAGINATION_LIMIT', 200);

define('DEFAULT_PAGINATION_SIZE', 10);

// validate regex online https://regex101.com/r/FylFY1/2
define('USERNAME_REGEX', '/(^([a-zA-z-0-9]+)(\d+)?$)/u');

define('NOTIFICATION_TYPES', NotificationType::values());

define('FRONT_URL', "https://tsefront.agencia7am.com");

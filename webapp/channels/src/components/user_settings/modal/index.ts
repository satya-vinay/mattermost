// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch} from 'redux';

import {sendVerificationEmail} from 'mattermost-redux/actions/users';
import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';

import {getPluginUserSettings} from 'selectors/plugins';

import type {GlobalState} from 'types/store';

import UserSettingsModal from './user_settings_modal';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    const sendEmailNotifications = config.SendEmailNotifications === 'true';
    const requireEmailVerification = config.RequireEmailVerification === 'true';

    return {
        currentUser: getCurrentUser(state),
        sendEmailNotifications,
        requireEmailVerification,
        pluginSettings: getPluginUserSettings(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({
            sendVerificationEmail,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsModal);

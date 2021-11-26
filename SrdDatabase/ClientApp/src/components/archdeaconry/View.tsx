import * as Store from '../../store/'

type Props =
    Store.State &
    typeof Store.actionCreators;
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as locationActions from '../../store/actions/location.action';
import * as colors from '../../../theme/colors';
import variables from '../../../theme/variables';
import { selectSearchedLocations } from '../../store/reducers/location.reducer';
import { getLocationForGooglePlaceId } from '../../utils/google-api';
import logger from '../../utils/logger';
import AutoCompleteSearch from '../AutoCompleteSearch/AutoCompleteSearch';
import styles from './Topbar.style';

const Topbar = ({ onResultPress }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const searchedLocations = useSelector(selectSearchedLocations);

	const dispatch = useDispatch();
	const fetchSearchedLocations = useCallback(
		(_searchQuery) => dispatch(locationActions.fetchSearchedLocation(_searchQuery)),
		[dispatch]
	);

	useEffect(() => {
		if (!searchQuery || searchQuery === '') {
			setIsSearchOpen(false);
		} else {
			setIsSearchOpen(true);
			fetchSearchedLocations(searchQuery);
		}
	}, [searchQuery, fetchSearchedLocations]);

	const handleSearchedResultPress = async (_result) => {
		const { placeId } = _result;
		try {
			const location = await getLocationForGooglePlaceId(placeId);
			if (location && location.latitude && location.longitude) {
				setIsSearchOpen(false);
				onResultPress(location);
			}
		} catch (error) {
			logger.logError(error, 'Error getting location for google place id.');
		}
	};

	return (
		<View style={styles.topBarContainer}>
			<AutoCompleteSearch
				onResultPress={handleSearchedResultPress}
				placeholder="Search Location"
				onChangeText={(_query) => {
					setSearchQuery(_query);
				}}
				value={searchQuery}
				results={isSearchOpen ? searchedLocations : null}
				style={isSearchOpen ? styles.autoCompleteSearchFull : styles.autoCompleteSearch}
			/>
			{!isSearchOpen && (
				<View style={styles.topBarIconContainer}>
					<MaterialCommunityIcons name="tune" color={colors.tint} size={variables.font.xxl} />
				</View>
			)}
			{!isSearchOpen && (
				<View style={styles.topBarIconContainer}>
					<MaterialCommunityIcons
						name="bell-outline"
						color={colors.tint}
						size={variables.font.xxl}
					/>
				</View>
			)}
		</View>
	);
};

export default Topbar;

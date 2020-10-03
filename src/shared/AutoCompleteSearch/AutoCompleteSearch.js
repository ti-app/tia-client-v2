import React from 'react';
import { View } from 'react-native';
import styles from './AutoCompleteSearch.styles';
import { Text, Searchbar, TouchableRipple } from 'react-native-paper';

const ResultRow = ({ value, isLast, onPress }) => {
	return (
		<TouchableRipple
			style={[styles.resultRow, isLast ? null : styles.resultRowBottomBorder]}
			onPress={onPress}
		>
			<Text style={styles.resultRowText}>{value}</Text>
		</TouchableRipple>
	);
};

const AutoCompleteSearch = ({
	results,
	style,
	onResultPress,
	onClose,
	showClose,
	showBorder = true,
	...props
}) => {
	return (
		<View style={[styles.autoCompleteSearchContainer, style]}>
			<View style={styles.searchContainer}>
				<Searchbar {...props} style={styles.searchBar} />
			</View>
			{results && results.length ? (
				<View style={styles.resultsContainer}>
					<View style={styles.results}>
						{results.map((aResult, idx) => (
							<ResultRow
								key={idx}
								value={aResult.description}
								onPress={() => {
									onResultPress(aResult);
								}}
								isLast={idx === results.length - 1}
							/>
						))}
					</View>
				</View>
			) : null}
		</View>
	);
};

export default AutoCompleteSearch;

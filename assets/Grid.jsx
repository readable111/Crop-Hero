/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * Can be used to establish a grid on a page
 * Design inspired by Bootstrap's 12 column grid with similar purpose of ensuring responsive design
 ***/

import { React } from 'react';
import { 
	StyleSheet, 
	View
} from 'react-native'



{/*define special tags for my grid layout*/}
const Column = ({ testID, relativeColsCovered=1, children=[], alignItems='flex-start'}) => {
	return  (
		<View style={[styles[`${relativeColsCovered}col`], styles.baseCol, alignItems && {alignItems}]}>{children}</View>
	)
}
const RowTag = ({ testID, height=50, children=[], specifiedStyle=null  }) => (
	<View style={[styles.row, specifiedStyle, height && {height}]}>{children}</View>
)


{/*define all of the custom styles for this page*/}
const styles = StyleSheet.create({
	//set of styles for the grid layout with the 1-12col styles being for specific widths
	row: {
		flexDirection: "row",
	},
	baseCol: {
		paddingLeft: 5,
		justifyContent: 'center',
	},
	"1col":  {
		flex:  1
	},
	"2col":  {
		flex:  2
	},
	"3col":  {
		flex:  3
	},
	"4col":  {
		flex:  4,
	},
	"5col":  {
		flex:  5,
	},
	"6col":  {
		flex:  6,
	},
	"7col":  {
		flex:  7,
	},
	"8col":  {
		flex:  8,
	},
	"9col":  {
		flex:  9,
	},
	"10col":  {
		flex:  10,
	},
	"11col":  {
		flex:  11,
	},
	"12col":  {
		flex:  12,
	},
})


export const Col = Column;
export const Row = RowTag;
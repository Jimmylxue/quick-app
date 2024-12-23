import React, { useState } from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

export const NumberInputDemo = () => {
	const [inputValue, setInputValue] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const handleButtonPress = (num: number) => {
		setInputValue(prev => prev + num)
		setErrorMessage('')
	}

	const handleDelete = () => {
		setInputValue(prev => prev.slice(0, -1))
		setErrorMessage('')
	}

	const handleClear = () => {
		setInputValue('')
		setErrorMessage('')
	}

	const handleSend = async () => {
		const isValid = /^[0-9]{8}$|^[0-9]{13}$/.test(inputValue)
		if (!isValid) {
			setErrorMessage('输入错误的数字格式，必须为8位或13位数字')
			return
		}

		// 创建 TXT 文件
		const fileUri = `${FileSystem.documentDirectory}input.txt`
		await FileSystem.writeAsStringAsync(fileUri, inputValue)

		// 分享文件
		await Sharing.shareAsync(fileUri)
		handleClear() // 清空输入框
	}

	return (
		<View style={styles.container}>
			<TextInput style={styles.input} value={inputValue} editable={false} />
			<View style={styles.buttonContainer}>
				{[...Array(10).keys()].map(num => (
					<TouchableOpacity
						key={num}
						style={styles.button}
						onPress={() => handleButtonPress(num)}
					>
						<Text style={styles.buttonText}>{num}</Text>
					</TouchableOpacity>
				))}
				<TouchableOpacity style={styles.button} onPress={handleDelete}>
					<Text style={styles.buttonText}>删除</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleClear}>
					<Text style={styles.buttonText}>清空</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.sendButton} onPress={handleSend}>
				<Text style={styles.sendButtonText}>发送</Text>
			</TouchableOpacity>
			{errorMessage ? (
				<Text style={styles.errorText}>{errorMessage}</Text>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	input: {
		width: '100%',
		height: 60,
		borderColor: 'gray',
		borderWidth: 1,
		textAlign: 'center',
		fontSize: 24,
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginBottom: 20,
	},
	button: {
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'gray',
		borderWidth: 1,
		margin: 5,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 24,
	},
	sendButton: {
		backgroundColor: '#007BFF',
		padding: 15,
		borderRadius: 5,
		marginTop: 20,
	},
	sendButtonText: {
		color: 'white',
		fontSize: 18,
	},
	errorText: {
		color: 'red',
		marginTop: 10,
		fontSize: 16,
	},
})

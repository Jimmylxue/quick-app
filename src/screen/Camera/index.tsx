import Button from '@src/components/Button/Button'
import CircleButton from '@src/components/Button/CircleButton'
import IconButton from '@src/components/Button/IconButton'
import {
	CameraCapturedPicture,
	CameraView,
	useCameraPermissions,
} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { shareAsync } from 'expo-sharing'

export function Camera() {
	const [facing, setFacing] = useState<'front' | 'back'>('back')
	const [permission, requestPermission] = useCameraPermissions()
	const [libraryPermission, requestLibraryPermission] =
		MediaLibrary.usePermissions()
	const [camera, setCamera] = useState<CameraView | null>(null)
	const [photo, setPhoto] = useState<CameraCapturedPicture>()

	if (!permission) {
		// Camera permissions are still loading.
		return <View />
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View className=" w-full h-full bg-[#25292e] flex justify-center items-center">
				<Text className=" text-white">
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} theme="primary" className=" mt-2">
					grant permission
				</Button>
			</View>
		)
	}

	if (!libraryPermission?.granted) {
		// Camera permissions are not granted yet.
		return (
			<View className=" w-full h-full bg-[#25292e] flex justify-center items-center">
				<Text className=" text-white">
					We need your permission to get libraryPermission
				</Text>
				<Button
					onPress={requestLibraryPermission}
					theme="primary"
					className=" mt-2"
				>
					grant permission
				</Button>
			</View>
		)
	}

	const toggleCameraFacing = () => {
		setFacing(current => (current === 'back' ? 'front' : 'back'))
	}

	const captureImage = async () => {
		if (permission.granted) {
			const photo = await camera!.takePictureAsync({
				quality: 1,
				base64: true,
				exif: false,
			})
			setPhoto(photo)
		}
	}

	const sharePhoto = async () => {
		await shareAsync(photo!.uri)
		setPhoto(undefined)
	}

	const savePhoto = async () => {
		if (!photo?.uri) {
			return
		}
		if (libraryPermission.granted) {
			await MediaLibrary.saveToLibraryAsync(photo.uri)
			setPhoto(undefined)
		}
	}

	if (photo) {
		return (
			<SafeAreaView className=" w-full h-full relative">
				<Image className=" w-full h-full" source={{ uri: photo.uri }} />
				<View className=" absolute w-full bottom-[80] left-0 flex flex-row justify-between items-center px-20">
					<IconButton
						icon="reload1"
						label="Reset"
						onPress={() => {
							setPhoto(undefined)
						}}
					/>
					<CircleButton
						iconName="download"
						theme="primary"
						onPress={savePhoto}
					/>
					<IconButton
						icon="sharealt"
						label="Save"
						onPress={() => {
							sharePhoto()
						}}
					/>
				</View>
			</SafeAreaView>
		)
	}

	return (
		<View style={styles.container}>
			<CameraView
				ref={ref => {
					setCamera(ref)
				}}
				style={styles.camera}
				facing={facing}
			>
				<View className="w-full h-full relative">
					<View className=" absolute right-5 top-20">
						<CircleButton
							iconName="sync"
							size="sm"
							onPress={toggleCameraFacing}
						/>
					</View>
					<View className=" w-full absolute bottom-[80] justify-center items-center">
						<CircleButton
							theme="primary"
							iconName="camerao"
							onPress={captureImage}
						/>
					</View>
				</View>
			</CameraView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
})

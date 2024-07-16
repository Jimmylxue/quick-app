import React, { useRef } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Button from '@src/components/Button/Button'
import { useState } from 'react'
import IconButton from '@src/components/Button/IconButton'
import CircleButton from '@src/components/Button/CircleButton'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'
import domtoimage from 'dom-to-image'
import ImageViewer from '@src/biz/Painting/ImageViewer'
import EmojiSticker from '@src/biz/Painting/EmojiSticker'
import EmojiPicker from '@src/biz/Painting/EmojiPicker'
import EmojiList from '@src/biz/Painting/EmojiList'
import { ChoosePicture } from '@src/biz/Painting/ChoosePicture'

const PlaceholderImage = require('@src/assets/images/background-image.png')

export function Painting() {
	const imageRef = useRef<any>()
	const [status, requestPermission] = MediaLibrary.usePermissions()
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [pickedEmoji, setPickedEmoji] = useState(null)

	const [chooseModalShow, setChooseModalShow] = useState<boolean>(false)

	if (status === null) {
		requestPermission()
	}

	const onReset = () => {
		setShowAppOptions(false)
	}

	const onAddSticker = () => {
		setIsModalVisible(true)
	}

	const onModalClose = () => {
		setIsModalVisible(false)
	}

	const onSaveImageAsync = async () => {
		if (Platform.OS !== 'web') {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				})
				await MediaLibrary.saveToLibraryAsync(localUri)
				if (localUri) {
					alert('Saved!')
				}
			} catch (e) {
				console.log(e)
			}
		} else {
			try {
				const dataUrl = await domtoimage.toJpeg(imageRef.current, {
					quality: 0.95,
					width: 320,
					height: 440,
				})

				let link = document.createElement('a')
				link.download = 'sticker-smash.jpeg'
				link.href = dataUrl
				link.click()
			} catch (e) {
				console.log(e)
			}
		}
	}

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer
						selectedImage={selectedImage!}
						placeholderImageSource={PlaceholderImage}
					/>
					{pickedEmoji && (
						<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
					)}
				</View>
			</View>
			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
			</EmojiPicker>

			{showAppOptions ? (
				<View className=" absolute w-full bottom-[80] left-0 flex-row justify-between items-center px-20">
					<IconButton icon="reload1" label="Reset" onPress={onReset} />
					<CircleButton
						iconName="plus"
						theme="primary"
						onPress={onAddSticker}
					/>
					<IconButton icon="download" label="Save" onPress={onSaveImageAsync} />
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button
						theme="primary"
						onPress={() => {
							setChooseModalShow(true)
						}}
					>
						Take Picture
					</Button>
					<Button onPress={() => setShowAppOptions(true)}>
						Use this photo
					</Button>
				</View>
			)}
			<StatusBar style="auto" />
			<ChoosePicture
				visible={chooseModalShow}
				onClose={() => {
					setChooseModalShow(false)
				}}
				onGetImageSource={uri => {
					setSelectedImage(uri)
					setShowAppOptions(true)
				}}
			/>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		position: 'relative',
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
})

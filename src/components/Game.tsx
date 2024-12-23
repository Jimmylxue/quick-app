import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	TouchableOpacity,
} from 'react-native'

const width = (Dimensions.get('window').width / 6) * 5
const height = (Dimensions.get('window').height / 6) * 4

const initialSnake = [{ x: 0, y: 0 }]

let initSize = 10

let interVal = 100

function initFood() {
	return {
		x: Math.floor(Math.random() * (width / initSize)),
		y: Math.floor(Math.random() * (height / initSize)),
	}
}

export const SnakeGame = () => {
	const [snake, setSnake] = useState(initialSnake)
	const [food, setFood] = useState(() => initFood())
	const [direction, setDirection] = useState({ x: 1, y: 0 })
	const [gameOver, setGameOver] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		let interval: any
		if (isPlaying) {
			interval = setInterval(moveSnake, interVal)
		}
		return () => clearInterval(interval)
	}, [snake, direction, isPlaying])

	const moveSnake = () => {
		if (gameOver) return

		const newSnake = [...snake]
		const head = {
			x: newSnake[0].x + direction.x,
			y: newSnake[0].y + direction.y,
		}

		// Check for collision with food
		if (head.x === food.x && head.y === food.y) {
			newSnake.unshift(head)
			setFood({
				x: Math.floor(Math.random() * (width / initSize)),
				y: Math.floor(Math.random() * (height / initSize)),
			})
		} else {
			newSnake.pop()
			newSnake.unshift(head)
		}

		// Check for collision with walls or itself
		if (
			head.x < 0 ||
			head.x >= width / initSize ||
			head.y < 0 ||
			head.y >= height / initSize ||
			newSnake
				.slice(1)
				.some(segment => segment.x === head.x && segment.y === head.y)
		) {
			setGameOver(true)
		} else {
			setSnake(newSnake)
		}
	}

	const changeDirection = (newDirection: any) => {
		if (
			(newDirection.x === -direction.x && newDirection.y === 0) ||
			(newDirection.y === -direction.y && newDirection.x === 0)
		) {
			return // Prevent reversing direction
		}
		setDirection(newDirection)
	}

	const handleStartPause = () => {
		if (gameOver) {
			setSnake(initialSnake)
			setFood(() => initFood())
			setDirection({ x: 1, y: 0 })
			setGameOver(false)
		}
		setIsPlaying(!isPlaying)
	}

	const handleDirection = (newDirection: any) => {
		changeDirection(newDirection)
	}

	return (
		<View className=" relative h-screen flex flex-row justify-center">
			<View className=" w-5/6 h-4/6 bg-sky-300 mt-20">
				{snake.map((segment, index) => (
					<View
						key={index}
						style={[
							styles.snakeSegment,
							{ left: segment.x * initSize, top: segment.y * initSize },
						]}
					/>
				))}
				<View
					style={[
						styles.food,
						{ left: food.x * initSize, top: food.y * initSize },
					]}
				/>
				{gameOver && (
					<View style={styles.gameOver}>
						<Text style={styles.gameOverText}>Game Over</Text>
					</View>
				)}
			</View>

			<View className="absolute bottom-2 right-2">
				{gameOver ? (
					<TouchableOpacity
						onPress={handleStartPause}
						style={styles.startPauseButton}
					>
						<Text style={styles.buttonText}>重新开始</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={handleStartPause}
						style={styles.startPauseButton}
					>
						<Text style={styles.buttonText}>{isPlaying ? '暂停' : '开始'}</Text>
					</TouchableOpacity>
				)}
			</View>

			<View className=" absolute bottom-2 left-2">
				<View className=" w-[100px] flex flex-row justify-center">
					<TouchableOpacity
						onPress={() => handleDirection({ x: 0, y: -1 })}
						style={{
							width: 40,
							height: 40,
							backgroundColor: '#808080',
							borderRadius: 5,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text style={styles.buttonText}>上</Text>
					</TouchableOpacity>
				</View>

				<View className=" flex justify-between flex-row w-[100px] my-2">
					<TouchableOpacity
						onPress={() => handleDirection({ x: -1, y: 0 })}
						style={{
							width: 40,
							height: 40,
							backgroundColor: '#808080',
							borderRadius: 5,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text style={styles.buttonText}>左</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleDirection({ x: 1, y: 0 })}
						style={{
							width: 40,
							height: 40,
							backgroundColor: '#808080',
							borderRadius: 5,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text style={styles.buttonText}>右</Text>
					</TouchableOpacity>
				</View>

				<View className=" w-[100px] flex flex-row justify-center">
					<TouchableOpacity
						onPress={() => handleDirection({ x: 0, y: 1 })}
						style={{
							width: 40,
							height: 40,
							backgroundColor: '#808080',
							borderRadius: 5,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text style={styles.buttonText}>下</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	snakeSegment: {
		position: 'absolute',
		width: initSize,
		height: initSize,
		backgroundColor: 'green',
	},
	food: {
		position: 'absolute',
		width: initSize,
		height: initSize,
		backgroundColor: 'red',
	},
	gameOver: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -50 }, { translateY: -50 }],
	},
	gameOverText: {
		color: 'white',
		fontSize: 30,
	},
	startPauseButton: {
		padding: 10,
		backgroundColor: 'blue',
		borderRadius: 5,
		marginBottom: 20,
	},

	buttonText: {
		color: 'white',
		fontSize: 20,
	},
})

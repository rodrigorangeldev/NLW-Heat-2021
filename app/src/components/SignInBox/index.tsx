import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'

import { Button } from '../Button'
import { COLORS } from '../../theme'
import { useAuth } from '../../hooks/auth'

export function SignInBox(){
    
    const { signIn, isSigning } = useAuth();

    return(
        <View>
            <Button 
                title="ENTRAR COM O GITHUB"
                color={COLORS.BLACK_PRIMARY}
                backgroundColor={COLORS.YELLOW}
                icon="github"
                onPress={signIn}
                isLoading={isSigning}
            />
        </View>
    )
}
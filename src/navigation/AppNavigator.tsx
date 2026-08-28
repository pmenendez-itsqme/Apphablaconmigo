import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriaScreen from '../screens/CategoriaScreen';
import EmocionesScreen from '../screens/EmocionesScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import InicioScreen from '../screens/InicioScreen';
import { colores } from '../theme/estilos';
import type { StackParams } from './types';

const Stack = createNativeStackNavigator<StackParams>();
const Tabs = createBottomTabNavigator();

/** Opciones de cabecera compartidas por pila y pestañas. */
const cabecera = {
  headerStyle: { backgroundColor: colores.principal },
  headerTintColor: colores.textoClaro,
  headerTitleStyle: { fontWeight: '700' as const },
};

/**
 * Pila del tablero: de la lista de categorías se entra al detalle y se
 * vuelve con el botón atrás que React Navigation añade solo.
 */
function TableroStack() {
  return (
    <Stack.Navigator screenOptions={cabecera}>
      <Stack.Screen
        name="Inicio"
        component={InicioScreen}
        options={{ title: 'Mi tablero' }}
      />
      <Stack.Screen
        name="Categoria"
        component={CategoriaScreen}
        // El título sale del parámetro recibido: la cabecera dice "Comida"
        // en lugar de un genérico "Categoría".
        options={({ route }) => ({ title: route.params.nombre })}
      />
    </Stack.Navigator>
  );
}

/** Icono de una pestaña. Crece un poco cuando está activa. */
function icono(simbolo: string) {
  return function Icono({ focused }: { focused: boolean }) {
    return <Text style={{ fontSize: focused ? 28 : 24 }}>{simbolo}</Text>;
  };
}

export default function AppNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        ...cabecera,
        tabBarActiveTintColor: colores.principal,
        tabBarInactiveTintColor: colores.textoSuave,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarStyle: { height: 70, paddingTop: 4, paddingBottom: 8 },
      }}
    >
      <Tabs.Screen
        name="Tablero"
        component={TableroStack}
        options={{
          tabBarIcon: icono('🗂️'),
          // La pila de dentro ya pinta su propia cabecera (con botón atrás),
          // así que se oculta la de la pestaña para no tener dos barras.
          headerShown: false,
        }}
      />
      {/* `title` es el texto de la CABECERA y `tabBarLabel` el de la PESTAÑA.
          Se separan porque abajo solo caben una o dos palabras, mientras que
          arriba hay sitio para un título que explique la pantalla. */}
      <Tabs.Screen
        name="Emociones"
        component={EmocionesScreen}
        options={{
          tabBarIcon: icono('😊'),
          title: '¿Cómo me siento?',
          tabBarLabel: 'Emociones',
        }}
      />
      <Tabs.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarIcon: icono('⭐'),
          title: 'Frases guardadas',
          tabBarLabel: 'Favoritos',
        }}
      />
    </Tabs.Navigator>
  );
}
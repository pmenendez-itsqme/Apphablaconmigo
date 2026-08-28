import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BienvenidaScreen from '../screens/BienvenidaScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import EmocionesScreen from '../screens/EmocionesScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import InicioScreen from '../screens/InicioScreen';
import { colores } from '../theme/estilos';
import type { RootStackParams, StackParams } from './types';

/**
 * ============================================================
 *  NAVEGACIÓN  (uno de los tres pilares del proyecto)
 * ============================================================
 *
 * La app usa los DOS tipos de navegación más habituales:
 *
 *   Pestañas (Bottom Tabs) ......... para saltar entre secciones
 *   Pila (Stack) ................... para entrar y volver dentro de una
 *
 * Estructura completa — hay TRES navegadores anidados:
 *
 *   Pila raíz
 *   ├── Bienvenida                        (fuera de las pestañas)
 *   └── Principal ──> Pestañas
 *                     ├── Tablero ──> Pila
 *                     │               ├── Inicio     (lista de categorías)
 *                     │               └── Categoria  (sus pictogramas)
 *                     ├── Emociones
 *                     └── Favoritos
 *
 * La bienvenida está en la pila RAÍZ y no dentro de las pestañas a propósito:
 * si estuviera dentro, aparecería como una pestaña más en la barra de abajo,
 * y es una pantalla que solo se ve una vez.
 */

// Los tipos de las rutas viven en `types.ts` (ver el comentario de ese
// archivo: evita un círculo de importaciones con las pantallas).
const Stack = createNativeStackNavigator<StackParams>();
const Tabs = createBottomTabNavigator();
const Raiz = createNativeStackNavigator<RootStackParams>();

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

/** Las tres pestañas. Ya no es el navegador raíz: cuelga de la pila de abajo. */
function Pestanas() {
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

/**
 * Navegador raíz: bienvenida primero, después toda la app.
 *
 * Las dos pantallas van sin cabecera. La bienvenida no la necesita porque se
 * presenta sola, y `Principal` la oculta porque las pestañas de dentro pintan
 * la suya: si no, saldrían dos barras de título apiladas.
 */
export default function AppNavigator() {
  return (
    <Raiz.Navigator screenOptions={{ headerShown: false }}>
      <Raiz.Screen name="Bienvenida" component={BienvenidaScreen} />
      <Raiz.Screen name="Principal" component={Pestanas} />
    </Raiz.Navigator>
  );
}

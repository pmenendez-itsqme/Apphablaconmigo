import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import BarraFrase from '../components/BarraFrase';
import { CATEGORIAS, pictogramasDe } from '../data/pictogramas';
import type { StackParams } from '../navigation/types';
import { AREA_TACTIL, colores, espacio } from '../theme/estilos';

type Props = NativeStackScreenProps<StackParams, 'Inicio'>;

export default function InicioScreen({ navigation }: Props) {
  return (
    <View style={estilos.pantalla}>
      <BarraFrase />

      <FlatList
        data={CATEGORIAS}
        keyExtractor={(categoria) => categoria.id}
        contentContainerStyle={estilos.lista}
        ListHeaderComponent={
          <Text style={estilos.intro}>Elige una categoría para ver sus pictogramas.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            // Al navegar se le pasan los datos que la otra pantalla necesita.
            // Se envían strings sencillos, no objetos: React Navigation pide
            // que los parámetros sean simples para poder guardarlos.
            onPress={() =>
              navigation.navigate('Categoria', {
                categoriaId: item.id,
                nombre: item.nombre,
              })
            }
            style={({ pressed }) => [
              estilos.tarjeta,
              { backgroundColor: item.color },
              pressed && estilos.pulsada,
            ]}
            accessibilityRole="button"
            accessibilityLabel={item.nombre}
          >
            <Text style={estilos.simbolo}>{item.simbolo}</Text>

            <View style={estilos.textos}>
              <Text style={estilos.nombre}>{item.nombre}</Text>
              <Text style={estilos.cantidad}>
                {pictogramasDe(item.id).length} pictogramas
              </Text>
            </View>

            <Text style={estilos.flecha}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  lista: {
    padding: espacio.md,
    gap: espacio.md,
  },
  intro: {
    fontSize: 15,
    color: colores.textoSuave,
    marginBottom: espacio.xs,
  },
  tarjeta: {
    minHeight: AREA_TACTIL + 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.md,
    borderRadius: 16,
    paddingHorizontal: espacio.md,
    paddingVertical: espacio.md,
  },
  pulsada: {
    opacity: 0.8,
  },
  simbolo: {
    fontSize: 40,
  },
  textos: {
    flex: 1,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: colores.textoClaro,
  },
  cantidad: {
    fontSize: 13,
    color: colores.textoClaro,
  },
  flecha: {
    fontSize: 26,
    color: colores.textoClaro,
  },
});
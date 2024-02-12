/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import Link from 'next/link';

import { MQ, colors } from '../themes';
import { Container, Drawer, TouchableOpacity, Txt } from '@/_ui';
import FlatList from 'react-flatlist-ui';

//assets
import { PathIcon } from '@/libs/assets/icons';

interface DrawerType {
  isDrawer: boolean;
  handleCloseDrawer: () => void;
}

//
export const DrawerMenus = memo(function DrawerMenus({ isDrawer, handleCloseDrawer }: DrawerType) {
  return (
    <Container css={{ display: 'none', [MQ[1]]: { display: 'flex' } }}>
      <Drawer open={isDrawer} onCancel={handleCloseDrawer}>
        <FlatList
          data={[
            { name: '메뉴1', path: '/404' },
            { name: '메뉴2', path: '/404' },
            { name: '메뉴3', path: '/404' },
            { name: '메뉴4', path: '/404' },
          ]}
          keyExtractor={(i) => i}
          renderItem={(item) => (
            <Link href={item?.path} css={{ width: '100%' }}>
              <TouchableOpacity
                align="center"
                crossAlign="space-between"
                padding={{ all: 10 }}
                borderRadius={14}
              >
                <Txt>{item.name}</Txt>
                <PathIcon fill={colors.grey300} />
              </TouchableOpacity>
            </Link>
          )}
          itemGap={10}
          padding={{ top: 10, bottom: 40, horizontal: 10 }}
        />
      </Drawer>
    </Container>
  );
});
